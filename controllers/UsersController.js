const User = require("../model/User");

const register = async (req, res, next) => {
	const { name, email, password } = { ...req.body };
	if (name && email && password) {
		try {
			const user = await User.create({ name, email, password });
			console.log("all goood");
			req.session.user = { name, email };
			return res.render("dashboard", { user });
		} catch (error) {
			const { errors } = error;
			// return res.send({ msg: "error", errors }); //api
			console.log("all baaaad");
			return res.render("user/register", { errors, msg: "error" }); //web
		}
	}
	return res.send("register __not__ goooood"); // !name || !email || !password
};

module.exports = { register };
