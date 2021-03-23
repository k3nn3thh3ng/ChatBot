const express       = require("express"),
	  passport      = require("passport"),
	  cors          = require("cors"),
	  
	  
	  User          = require("../models/user-model"),
	  middlewareObj = require("../middleware/index"),
	  
	  router        = express.Router();


//routes(Authentication)
router.get("/logout", async (req, res) => {
	await req.logout();
	console.log("successfully logout")
	res.status(200).json({
		authenticated: false,
		message: `Success Logout!`
	})
});
	

router.post("/login", passport.authenticate("local",{
	failureRedirect: "/login"
}), function(req, res){
	res.status(200).json({
		authenticated: true,
		user: req.user,
		message: `Welcome ${req.user.username}!`,
		session: req.session,
		sessionID: req.sessionID
	})
});

router.get("/testroute", function(req, res){
	console.log(req);
	res.status(200).json({
		authenticated: true,
		session: req.session,
		sessionID: req.sessionID
	})
});
	

module.exports = router;