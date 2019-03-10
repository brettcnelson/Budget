const mongoose = require('mongoose');

const schema = mongoose.Schema({
	database: {
		type: String,
		required: true
	},
	dbCollection: {
		type: String,
		required: true
	},
	create_date: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('entries', schema);
