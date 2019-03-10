const mongoose = require('mongoose');

const monthSchema = mongoose.Schema({
	month: {
		type: Object,
		required: true
	}
});

module.exports = mongoose.model('months', monthSchema);
