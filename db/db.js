const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db_name = path.join(__dirname, "../data", "apptest.sqlite");

const db = new sqlite3.Database(db_name, (err) => {
	if (err) return console.error(err.message);
});

module.exports = db;
