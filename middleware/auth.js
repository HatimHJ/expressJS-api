function auth(req, res, next) {
	console.log(req.session);
	if (!req.session.user) {
		return res.redirect("back");
	}
	next();
}

module.exports = { auth };
