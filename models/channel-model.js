const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const channelSchema = new Schema({
    name: {type: String, unique:true},
    updated: { type: Date, default: Date.now }, 
	message: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Message"
		}
	]
});

channelSchema.statics.findOneOrCreate = function findOneOrCreate(condition, doc) {
	const self = this;
	const newDocument = doc;
	return new Promise((resolve, reject) => {
		
		return self.findOne(condition)
		.then((result) => {
			if (result) {
				return resolve(result);
			}
			return self.create(newDocument)
			.then((result) => {
				return resolve(result);
			}).catch((error) => {
				return reject(error);
			})
		}).catch((error) => {
			return reject(error);
		})
	});
};


const Channel = mongoose.model("Channel", channelSchema);

module.exports = Channel;
