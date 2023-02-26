const Listing = require("../model/Listing");
const User = require("../model/User");
const Offer = require("../model/Offer");
const { msg } = require("../utils/index");

const index = async (req, res) => {
	try {
		const listings = await Listing.find({}).sort([["createdAt", "desc"]]);
		const totallistings = listings.length;
		const currentPage = req.query.page || 1;
		const perPage = 2;
		const from = (currentPage - 1) * perPage;
		const to = currentPage * perPage;
		if (totallistings > 1) {
			return res.render("listing/index", {
				listings: listings.slice(from, to),
				totallistings,
			});
		}
		return res.render("listing/index", { listings });
	} catch (error) {
		msg(req, "something went wrong..", "danger");
		return res.redirect("/");
	}
};

const show = async (req, res) => {
	try {
		const listing = await Listing.findById(req.params.id);
		if (!listing) {
			msg(req, "listng no more", "danger");
			return res.redirect("/listings");
		}
		const user = await User.findById(listing.user_id);
		const offers = await Offer.find({ listing_id: listing._id })
			.sort([["createdAt", "desc"]])
			.exec();
		return res.render("listing/show", { listing, user, offers });
	} catch (error) {
		msg(req, "smething baad happened..", "danger");
		return res.redirect("/listings");
	}
};

const create = async (req, res) => {
	return res.render("listing/create");
};

const store = async (req, res) => {
	const { title, price, desc } = req.body;
	if (!title || !price || !desc) {
		msg(req, "fill all fields ...", "warning");
		return res.redirect("back");
	}
	try {
		const listing = await Listing.create({
			...req.body,
			user_id: req.session.user._id,
			user_name: req.session.user.username,
		});
		msg(req, "listing created successfully... ", "success");
		return res.redirect(`/listings/show/${listing._id}`);
	} catch (error) {
		console.log(error);
		msg(req, "fallow create listing rules  ...", "warning");
		return res.redirect("back");
	}
};

const edit = async (req, res) => {
	const listing = await Listing.findById(req.params.id);
	if (!listing) {
		msg(req, "listng no more", "danger");
		return res.redirect("/listings");
	}
	return res.render("listing/edit", { listing });
};

const update = async (req, res) => {
	const { id } = req.params;
	try {
		const listing = await Listing.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		msg(req, "listing edit successfully", "success");
		return res.redirect(`/listings/show/${id}`);
	} catch (error) {
		msg(req, "editing failed successfully..☻☺", "danger");
		return res.redirect(`/listings/edit/${id}`);
	}
};

const destroy = async (req, res) => {
	try {
		const listing = await Listing.findByIdAndRemove({ _id: req.params.id });
	} catch (error) {
		msg(req, "no shuch listng here..", "warning");
		return res.redirect("/listings");
	}
	msg(req, "listng deleted successfully", "success");
	return res.redirect("/listings");
};

// offer functions
const addOffer = async (req, res) => {
	const { price, desc } = req.body;
	if (!price || !desc) {
		msg(req, "fill all fields ...", "warning");
		return res.redirect("back");
	}
	try {
		const offer = await Offer.create({
			...req.body,
			user_id: req.session.user._id,
			listing_id: req.params.id,
		});
		msg(req, "offer made successfully... ", "success");
		return res.redirect(`/listings/show/${req.params.id}`);
	} catch (error) {
		console.log(error);
		msg(req, "fallow create listing rules  ...", "warning");
		return res.redirect("back");
	}
};

const selectOffer = async (req, res) => {
	const { offer_id } = req.body;
	console.log(`offer id from hidden from ${offer_id}`);
	try {
		const offer = await Offer.findOneAndUpdate(
			{ _id: offer_id },
			{
				isSelected: true,
			},
			{
				new: true,
			}
		);
		msg(req, "offer selected successfully ☻", "success");
		return res.redirect("back");
	} catch (error) {
		console.log(error);
		return res.redirect("back");
	}
};

module.exports = {
	index,
	show,
	create,
	store,
	edit,
	update,
	destroy,
	addOffer,
	selectOffer,
};
