// ================[/books]====================
const express = require("express");
const router = express.Router();
const db = require("../db/db");
const query = require("../db/query");
const {
	get_all,
	get_one,
	delete_one,
	update_one,
	insert_one,
} = require("../controllers/BooksController");

// router.get("/", get_all);
// router.get("/:id", get_one);
// router.put("/:id", update_one);
// router.delete("/:id", delete_one);
// router.post("/", insert_one);

router.route("/").get(get_all).post(insert_one);
router.route("/:id").get(get_one).put(update_one).delete(delete_one);

module.exports = router;
