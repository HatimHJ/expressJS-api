// ================[/books]====================
const express = require("express");
const router = express.Router();
const {
	index,
	create,
	store,
	show,
	edit,
	update,
	destroy,
	addOffer,
	selectOffer,
} = require("../controllers/ListingsController");
const { auth } = require("../middleware/auth");

// public routes
router.route("/").get(index);
router.route("/show/:id").get(show);

// private routes
router.route("/create").get(auth, create).post(auth, store);
router.route("/edit/:id").get(auth, edit).post(auth, update);
router.route("/destroy/:id").post(auth, destroy);

// offer route [id => listing ID]
router.route("/offer/:id").post(auth, addOffer);
router.route("/select/:id").post(auth, selectOffer);

module.exports = router;
