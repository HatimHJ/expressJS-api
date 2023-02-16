const Book = require("../model/Book");

const get_all = async (req, res) => {
	const books = await Book.find({});
	return res.status(200).json({ msg: "success", books });
};

const insert_one = async (req, res) => {
	const book = await Book.create(req.body);
	return res.status(201).json({ msg: "success", book });
};

const get_one = async (req, res) => {
	const book = await Book.findById(req.params.id);
	if (!book) return res.status(404).json({ msg: "faild" });
	return res.status(200).json({ msg: "success", book });
};

const update_one = async (req, res) => {
	const book = await Book.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
	});
	if (!book) return res.status(404).json({ msg: "faild" });
	return res.status(200).json({ msg: "success", book });
};

const delete_one = async (req, res) => {
	const book = await Book.findByIdAndRemove({ _id: req.params.id });
	if (!book) return res.status(404).json({ msg: "faild" });
	return res.status(200).json({ msg: "success" });
};

module.exports = { get_all, insert_one, get_one, update_one, delete_one };
