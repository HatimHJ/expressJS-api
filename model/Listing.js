const mongoose = require("mongoose");
const { Schema } = mongoose;

const listingSchema = new Schema(
	{
		price: {
			type: Number,
			required: [true, "Please provide price"],
		},
		title: {
			type: String,
			minlength: [10, "name must be longer than 10 char."],
			required: [true, "Please provide title"],
		},
		desc: {
			type: String,
			required: [true, "Please provide description"],
			minlength: [50, "name must be longer than 50 char."],
		},
		user_id: {
			type: String,
		},
		user_name: {
			type: String,
		},
	},
	{ timestamps: true }
);

// the document(table) will be the name of the model(listing)+s
module.exports = mongoose.model("listing", listingSchema);
