require('dotenv').config();
const express = require('express'),
	  bodyParser = require('body-parser'),
	  mongoose = require('mongoose'),
	  cors = require('cors'),
	  passport = require("passport"),
	  expressSession = require('express-session');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
	cors: {
		origin: "https://chatbox-func-mqyln.run.goorm.io",
		methods: ["GET", "POST"],
		allowedHeaders: ["my-custom-header"],
		credentials: true
	}
})

//Models
const User          = require("./models/user-model"),
	  Message       = require("./models/message-model"),
	  Channel       = require("./models/channel-model");

//Requiring Routes
const userCRUD = require('./router/userCRUD'),
	  userAuth = require('./router/userAuth'),
	  channel  = require('./router/channel');


//Requiring Custom Middleware
const middlewareObj = require('./middleware/index');

//port configuration
const PORT = process.env.PORT || 3001;

//mongoose configuration
mongoose.connect(process.env.MONGODB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('MongoDB Connected!')
});

//allowing cors
app.use(cors({
	origin: "https://chatbox-func-mqyln.run.goorm.io",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",  
	credentials: true, 
	optionsSuccessStatus: 204,
	maxAge: 3600
}))

//session configuration
const sessionMiddleware = expressSession({
    secret: process.env.Session_Secret,
    resave: true,
    saveUninitialized: true,
	cookie: {
        expires: 600000
    }
});
app.use(sessionMiddleware);

//body parser middleware package config
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Passport config import
app.use(passport.initialize());
app.use(passport.session());
const passportSetup = require("./strategy/passport-local-setup");

//Routes Config
app.use('/api', userCRUD);
app.use('/api', userAuth);
app.use('/api', channel)


app.get("/api/status", middlewareObj.authCheck, (req, res) => {
	console.log("success /api/status")
	console.log(req.session)
	console.log(req.user)
	res.status(200).json({
		authenticated: true,
		message: "user information retrieve success",
		user: req.user,
		socketId: req.session.socketId
	});
});

app.get("/api/test", (req, res) => {
	res.status(200).json({
		authenticated: true,
		message: "user information retrieve success",
		user: req.user,
		cookies: req.cookies
	});
});

app.get('/api/getChannels', (req, res) => {
    res.status(200).json({
		channels: STATIC_CHANNELS,
		message: "static channels retrieved"
    })
});
//Passport serialising and deserialise user
passport.serializeUser(function(user, done) {
    done(null, user.id); 
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

//Error-handling middleware
app.use(middlewareObj.logErrors)
app.use(middlewareObj.clientErrorHandler)
app.use(middlewareObj.errorHandler)

//app listening start
let interval;

//Socket.io configuration
io.use(middlewareObj.wrap(sessionMiddleware));
io.use(middlewareObj.wrap(passport.initialize()));
io.use(middlewareObj.wrap(passport.session()));

io.on("connection", (socket) => { 
	console.log(`Client ${socket.id} connected`);
	
	const session = socket.request.session;
	// Join a conversation
	const { roomId } = socket.handshake.query;
	socket.join(roomId);
	
	// Listen for new messages
	socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
		var username = socket.request.user.username
		User.find({
			username: username}, function (err, founduser){
				if(err){
					console.log(err)
				} else {
					console.log('FoundUser: ',founduser)
					var Creation = {createdBy: founduser, message: data.message};
					Message.create(Creation, function(err, newmessage){
						if(err) {
							console.log(err)
						} else {
							console.log('Message: ',newmessage)
							Channel.find({name: data.channelId}, function(err, foundchannel){
								if(err) {
									console.log(err)
								} else {
									console.log(foundchannel);
									const updatedDate = Date.now();
									foundchannel[0].message.push(newmessage);
									foundchannel[0].updated = updatedDate;
									foundchannel[0].save()
									io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, newmessage);
									console.log('After Foundchannel: ',foundchannel);
								}
							})
						}
					})
				}
			}
		)
	});

	//Timer socket logic
	const getApiAndEmit = (socket) => {
		const response = new Date();
		// Emitting a new message. Will be consumed by the client
		socket.emit("FromAPI", response);
	};
	if (interval) {
		clearInterval(interval);
	};
	var interval = setInterval(() => getApiAndEmit(socket), 1000);
	
	//Cleaning up old chat, new chat and timer
	socket.on('disconnect', () => {
		clearInterval(interval);
		console.log(`Client ${socket.id} diconnected`);
		socket.leave(roomId);
	});
});



server.listen(PORT, () => {
    console.log('Server started on port', PORT);
});

//Chat app variables
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
