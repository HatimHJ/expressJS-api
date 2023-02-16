const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
	req.session.test = "ggggg";
	req.session.cookie.expires = 1000 * 60;
	res.render("index", { title: "Express..." });
});

router.post("/", async (req, res, next) => {
	console.log(req.body);
	res.render("index");
});

module.exports = router;
