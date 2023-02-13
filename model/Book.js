const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema({
	title: String, // String is shorthand for {type: String}
	author: String,
	comments: String,
});

// the document(table) will be the name of the model(book)+s
module.exports = mongoose.model("book", bookSchema);
