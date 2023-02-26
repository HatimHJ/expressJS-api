const User = require("../model/User");
const bcrypt = require("bcrypt");

function msg(req, message, type) {
	req.flash("info", message);
	req.flash("type", type);
}

function hashing(name, email, pass, req, res) {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(pass, salt, async (err, hash) => {
			if (err) {
				return console.log(err);
			}
			const password = hash;
			try {
				const user = await User.create({ name, email, password });
				req.session.user = {
					username: user.name,
					email: user.email,
					_id: user._id,
				};
				msg(req, `welcome ${user.name}`, "success");
				return res.redirect("/listings");
			} catch (error) {
				// handle registeration rules errors
				msg(req, `please follow registeration rules..`, "warning");
				return res.redirect("back");
			}
		});
	});
}

module.exports = { msg, hashing };
