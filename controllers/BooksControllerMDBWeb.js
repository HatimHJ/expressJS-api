const Book = require("../model/Book");

// [index] view show all
const index = async (req, res) => {
	const books = await Book.find({});
	if (req.session.user) {
		const { username, email } = req.session.user;
		return res.render("post/index", {
			title: "success",
			books,
			username,
			email,
		});
	}
	return res.render("post/index", { title: "success", books });
};

// [create] view show create form
const create = async (req, res) => {
	return res.render("post/create", { title: "create" });
};

// handle create form
const store = async (req, res) => {
	console.log(req.body);
	const book = await Book.create(req.body);
	if (book) {
		return res.redirect("/books");
	}
};

// [show] view show one
const show = async (req, res) => {
	const book = await Book.findById(req.params.id);
	if (!book) return res.redirect("back");
	if (req.session.user) {
		const { username, email } = req.session.user;
		return res.render("post/show", {
			title: "success",
			book,
			username,
			email,
		});
	}
	return res.render("post/show", { book });
};

// [edit] view show edit form
const edit = async (req, res) => {
	const book = await Book.findById(req.params.id);
	if (!book) return res.redirect("back");
	return res.render("post/edit", { book });
};

// handle edit form
const update = async (req, res) => {
	const book = await Book.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
	});
	if (!book) return res.redirect("back");
	return res.redirect("/books");
};

// handle delete one
const destroy = async (req, res) => {
	const book = await Book.findByIdAndRemove({ _id: req.params.id });
	if (!book) return res.redirect("back");
	return res.redirect("/books");
};

module.exports = {
	index,
	show,
	create,
	store,
	edit,
	update,
	destroy,
};
