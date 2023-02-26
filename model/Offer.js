const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
	user_id: {
		type: String,
		required: true,
	},
	listing_id: {
		type: String,
		required: true,
	},
	desc: {
		type: String,
		required: [true, "Please provide description"],
		minlength: [20, "name must be longer than 20 char."],
	},
	price: {
		type: Number,
		required: [true, "Please provide price"],
	},
	isSelected: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model("offer", offerSchema);

/**
 * <form class="btn-group" action="/listings/destroy/<%= listing._id%>" method="post">
									<button class="btn btn-outline-danger" data-bs-custom-class="custom-tooltip" data-bs-placement="top" data-bs-toggle="tooltip" data-bs-title="delete" >
										<i data-feather="trash"></i>
									</button>
								</form>
 * 
 */
