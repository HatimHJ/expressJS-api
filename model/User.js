const { Schema, model } = require("mongoose");

const userSchema = new Schema({
	name: {
		type: String,
		required: [true, "Please provide name"],
		minlength: [3, "name must be longer than 3 char."],
	},
	email: {
		type: String,
		required: [true, "Please provide email"],
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			"Please provide a valid email",
		],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Please provide password"],
		minlength: [4, "password must be longer than 4 char."],
	},
});

module.exports = model("User", userSchema);
