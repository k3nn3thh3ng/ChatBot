const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose'); 

const userSchema = new Schema({
    email: {type: String, default: 'empty'}, 
    username: {type: String, unique:true}, 
	password: String,
});

userSchema.plugin(passportLocalMongoose); 

const User = mongoose.model("User", userSchema);

module.exports = User;
