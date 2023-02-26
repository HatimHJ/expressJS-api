function auth(req, res, next) {
	if (!req.session.user) {
		return res.redirect("back");
	}
	next();
}

module.exports = { auth };
