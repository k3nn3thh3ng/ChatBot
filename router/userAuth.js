const express       = require("express"),
	  passport      = require("passport"),
	  cors          = require("cors"),
	  
	  
	  User          = require("../models/user-model"),
	  middlewareObj = require("../middleware/index"),
	  
	  router        = express.Router();


//routes(Authentication)
router.get("/logout", async (req, res, next) => {
	await req.logout();
	console.log("successfully logout")
	res.status(200).json({
		authenticated: false,
		message: `${user.username} Logout!`
	})
});
	

router.post('/login', async function(req, res, next) {
	console.log(req.body);
	// body parser should pass username and password correctly
	// const user = new User({
	// 	username: req.body.username,
	// 	password: req.body.password
	// })
	await passport.authenticate('local', { failureRedirect: '/login' }),
	function (req, res, err) {
		if (err) {
			next(err)
		}
		console.log('local auth success')
		res.status(200).json({
			authenticated: true,
			user: req.user,
			cookies: req.cookies,
			message: `Welcome ${user.username}!`
		})
	}
})

	

module.exports = router;