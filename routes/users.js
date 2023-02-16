const router = require("express").Router();
const { register } = require("../controllers/UsersController");
const User = require("../model/User");

router.get("/register", function (req, res, next) {
	res.render("user/register");
});

// router.post("/register", register);
router.post("/dashboard", register);

router.get("/login", function (req, res, next) {
	res.render("user/login");
});
router.post("/login", async function (req, res, next) {
	const { name, password } = req.body;
	const user = await User.findOne({ name, password });
	if (!user) {
		res.redirect("back");
	} else {
		req.session.user = { username: user.name, email: user.email };
		res.redirect("/books");
	}
});

router.post("/logout", function (req, res, next) {
	req.session.user = null;
	res.redirect("/books");
});

module.exports = router;
