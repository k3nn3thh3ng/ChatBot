const express       = require("express"),
	  passport      = require('passport'),

	  User          = require("../models/user-model"),

	  router        = express.Router();

//routes(Authentication)
router.post('/user', function(req, res, next){
	console.log(req)
	var Creation = new User({email: req.body.user.email, username: req.body.user.username});
	User.register(Creation, req.body.user.password, function(err, user) { 
		if (err) { 
			next(err)
		} else {
			console.log('A user just registered');
			passport.authenticate('local');
				res.status(200).json({
					authenticated: true,
					message: `Created ${user.username}!`
				})
			}
		});
}); 

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