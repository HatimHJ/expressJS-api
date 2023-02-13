const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
	res.render("index", { title: "Express..." });
});

router.post("/", async (req, res, next) => {
	console.log(req.body);
	res.render("index");
});

module.exports = router;
