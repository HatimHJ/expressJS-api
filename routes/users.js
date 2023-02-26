const router = require("express").Router();
const { register, login } = require("../controllers/UsersController");

router.get("/register", (req, res) =>
	res.render("user/register", { title: "register" })
);

router.get("/login", (req, res) =>
	res.render("user/login", { title: "login" })
);

router.post("/register", register);
router.post("/login", login);

router.post("/logout", (req, res, next) => {
	req.session.user = null;
	return res.redirect("/");
});

module.exports = router;
