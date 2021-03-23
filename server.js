require('dotenv').config();
const express = require('express'),
	  bodyParser = require('body-parser'),
	  mongoose = require('mongoose'),
	  cors = require('cors'),
	  passport = require("passport"),
	  expressSession = require('express-session');

const app = express();

//Models
const User = require("./models/user-model");

//Requiring Routes
const userCRUD = require('./router/userCRUD'),
	  userAuth = require('./router/userAuth');


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
	origin: true,
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",  
	credentials: true, 
	optionsSuccessStatus: 204,
	maxAge: 3600
}))


//session configuration
app.use(expressSession({
    secret: process.env.Session_Secret,
    resave: false,
    saveUninitialized: true
}));

//body parser middleware package config
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Passport config import
app.use(passport.initialize());
app.use(passport.session());
const passportSetup = require("./strategy/passport-local-setup");
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





//Routes Config
app.use('/api', userCRUD);
app.use('/api', userAuth);


app.get("/api/status", middlewareObj.authCheck, (req, res) => {
	console.log("success /api/status")
	res.status(200).json({
		authenticated: true,
		message: "user information retrieve success",
		user: req.user,
		cookies: req.cookies
	});
});

//Error-handling middleware
app.use(middlewareObj.logErrors)
app.use(middlewareObj.clientErrorHandler)
app.use(middlewareObj.errorHandler)

//app listening start
app.listen(PORT, () => {
    console.log('Server started on port', PORT);
});