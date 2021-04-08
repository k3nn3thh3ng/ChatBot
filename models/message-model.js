const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    createdBy: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	],
    dateCreated: { type: Date, default: Date.now }, 
	message: String
});


const Message = mongoose.model("Message", messageSchema);

module.exports = Message;