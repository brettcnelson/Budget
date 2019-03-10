const mongoose = require('mongoose');

const monthSchema = mongoose.Schema({
	month: {
		type: String,
		required: true
	},
	limit: {
		type: Number,
		default:0
	},
	mandatory: {
		type: Object
	},
	optional: {
		type: Object
	}
});

module.exports = mongoose.model('months', monthSchema);
