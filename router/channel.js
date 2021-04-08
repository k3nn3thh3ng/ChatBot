const express       = require("express"),

	  User          = require("../models/user-model"),
	  Message       = require("../models/message-model"),
	  Channel       = require("../models/channel-model"),

	  router        = express.Router();

router.get('/channels', function(req, res){
	console.log('get request for channels')
	Channel.find({}, ['name', 'updated']).sort({ updated : -1}).exec(function(err, channels){
		if (err) {
			console.log(err)
		}
		console.log(channels);
		res.status(200).json({
			channels: channels
		})
	});
})

//channel(create)
router.get('/channel/:channelname', function(req,res){
	console.log(req.params.channelname);
	console.log('request here')
	Channel.findOneOrCreate({name: req.params.channelname}, {name: req.params.channelname})
	.then(function(channel){
		console.log('responding with message History2')
		Channel.findById(channel._id).populate({path: "message", populate: {path: "createdBy"}}).exec(function(err, messageHistory){
			if(err){
				console.log(err)
			} else {
				console.log(messageHistory)
				res.status(200).json({
					messageHistory: messageHistory
				})
			}
		})
	})
	.catch((err) => {
		if (err) {
			console.log(err)
		}
	})
});



module.exports = router