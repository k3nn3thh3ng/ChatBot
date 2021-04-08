const express       = require("express"),
	  passport      = require('passport'),

	  User          = require("../models/user-model"),

	  router        = express.Router();

const faker = require('faker');
//routes(Authentication)
router.post('/user', function(req, res, next){
	if (!req.body.email) {
		var Creation = new User({username: req.body.username});
		User.register(Creation, req.body.password, function(err, user) { 
			if (err) { 
				next(err)
			} else {
				console.log('A user just registered');
				passport.authenticate('local')(req, res, function(){
						res.status(200).json({
						authenticated: true,
						message: `Created ${user.username}!`,
						user: req.user
					})
				})
			}
		});
	} else if(req.body.email) {
		res.status(401).json({
			message: 'you are not authorised to do this'
		})
	}
}); 

router.post('/setpublic', function(req, res, next){
	req.body.username = capitalize(faker.fake('{{commerce.color}} {{animal.dog}}'))
	req.body.password = process.env.setpublicKey
	if (!req.user) {
		var Creation = new User({username: req.body.username});
		User.register(Creation, req.body.password , function(err, user) { 
			if (err) { 
				next(err)
			} else {
				console.log(`A ${user.username} just registered`);
				passport.authenticate('local')(req, res, function(){
						res.status(200).json({
						authenticated: true,
						message: `Created ${user.username}!`,
						user: req.user
					})
				})
			}
		});
	} else if(req.user) {
		res.status(200).json({
			authenticated: true,
			message: `You are login as ${req.user.username}!`,
		})
	}
}); 

const capitalize = (s) => {
	if (typeof s !== 'string') return ''
	return s.charAt(0).toUpperCase() + s.slice(1)
}

// Please add in validation for requesting own data vs others data
// router.get('/user/:id', function(req, res){
// 	User.find((req.params.id), req.body.user, function(err, user){
// 		if(err){
// 			console.log(err)
// 		} else {
// 			res.status(200).json({
// 				authenticated: true,
// 				message: `${user.username} Profile Found!`
// 			})
// 		}
// 	})
// })

// Validate, only the user can edit his own data
// router.put('/user/:id', function(req, res){
// 	User.findOneAndUpdate((req.params.id), req.body.user, function(err, user){
// 		if(err){
// 			console.log(err)
// 		} else {
// 			res.status(200).json({
// 				updated: true,
// 				message: `${user.username} Profile Updated!`
// 			})
// 		}
// 	})
// })

module.exports = router