const User = require("../model/User");
const bcrypt = require("bcrypt");
const { hashing, msg } = require("../utils/index");

const register = async (req, res) => {
	const { name, email } = { ...req.body };
	let tempPass = req.body.password;
	if (name && email && tempPass) {
		try {
			const userCheck = await User.findOne({ email });
			if (userCheck) {
				msg(req, "user alerdy register", "danger");
				return res.redirect("back");
			}
			if (tempPass.length < 4) {
				msg(req, "please follow registeration rules..", "warning");
				return res.redirect("back");
			}
			hashing(name, email, tempPass, req, res);
		} catch (error) {
			console.log(error);
		}
	} else {
		msg(req, "please fill all fields..", "danger");
		return res.redirect("back");
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		msg(req, "wrong email...", "danger");
		return res.redirect("back");
	} else {
		if (bcrypt.compareSync(password, user.password)) {
			req.session.user = {
				username: user.name,
				email: user.email,
				_id: user._id,
			};
			msg(req, `Welcome Back ${user.name}`, "primary");
			return res.redirect("/listings");
		} else {
			msg(req, `wrong password...`, "danger");
			return res.redirect("back");
		}
	}
};

module.exports = { register, login };
