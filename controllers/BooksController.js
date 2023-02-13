const db = require("../db/db");
const query = require("../db/query");

const get_all = (req, res) => {
	const sql = query.sql_get_all;
	db.all(sql, [], (err, rows) => {
		if (err) {
			return console.error(err.message);
		}
		// web
		// return res.render("books", { title: "books", data: rows });
		// api
		return res.json({ msg: "success", data: rows });
	});
};

const get_one = (req, res) => {
	const sql = query.sql_get_one(req.params.id);

	db.get(sql, [], (err, row) => {
		if (err) {
			return console.log(err.message);
		} else {
			if (row) {
				// api
				return res.json({ msg: "success", data: row });
				// web
				// return res.render(`book`, { msg: "success", data: row });
			} else {
				return res.status(404).json({ msg: "no data ... " });
			}
		}
	});
};

const update_one = (req, res) => {
	const id = req.params.id;
	const sql = query.sql_get_one(id);
	db.get(sql, [], (err, row) => {
		err && console.log(err.message);
		if (row) {
			const sql_update = query.sql_update(id, row, req.body);
			db.run(sql_update, (err) => err && console.log(err.message));
			return res.json({ msg: "success..." });
		} else {
			return res.status(404).json({ msg: "faild..." });
		}
	});
};

const delete_one = (req, res) => {
	const id = req.params.id;
	const sql = query.sql_get_one(id);
	db.get(sql, [], (err, row) => {
		err && console.log(err.message);
		if (row) {
			const sql = query.sql_delete(id);
			db.run(sql, (err) => err && console.log(err.message));
			return res.json({ msg: "deleted success..." });
		} else {
			return res.status(404).json({ msg: "faild..." });
		}
	});
};
const insert_one = (req, res) => {
	const errs = [];
	const { title, author, comments } = req.body;

	!title && errs.push("enter title");
	!author && errs.push("enter author");
	!comments && errs.push("enter comments");

	if (!errs.length) {
		const { sql, params } = query.sql_insert(req.body);
		db.run(sql, params, (err) => err && console.error(err.message));

		// web
		// return res.redirect("/books");
		// api
		return res.status(201).json({ msg: "success" });
	} else res.status(400).json({ msg: "faild..", errors: errs });
};

module.exports = {
	get_all,
	get_one,
	update_one,
	delete_one,
	insert_one,
};
