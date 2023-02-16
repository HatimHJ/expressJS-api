// ================[/books]====================
const express = require("express");
const router = express.Router();
const {
	index,
	show,
	create,
	store,
	edit,
	update,
	destroy,
} = require("../controllers/BooksControllerMDBWeb");
const { auth } = require("../middleware/auth");

// form send only post || get
router.route("/").get(index);

router.post("/create", store);
router.get("/create", auth, create);

router.route("/:id").get(show);
router.route("/edit/:id").get(auth, edit).post(update);
router.route("/destroy/:id").post(auth, destroy);
module.exports = router;
