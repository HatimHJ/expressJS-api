const express = require("express");
const router = express.Router();
const Listing = require("../model/Listing");

/* GET welcome page. */
router.get("/", async function (req, res) {
	if (req.session.user) {
		const { username, email } = req.session.user;
		return res.render("welcome", {
			title: "home",
			username,
			email,
			isLogged: true,
		});
	}
	return res.render("welcome", { title: "home" });
});

router.get("/search", (req, res) => res.render("search", { listings: [] }));
router.post("/search", async (req, res) => {
	const { search } = req.body;
	req.params.q = search;
	try {
		const listings = await Listing.find({ title: new RegExp(search, "gi") });
		return res.render(`search`, { listings });
	} catch (error) {
		console.log(`listingssss no more...`);
	}
	return res.redirect("back");
});

module.exports = router;
