const mongoose = require('mongoose');

const schema = mongoose.Schema({
	
});

module.exports = mongoose.model('entries', schema);

// database: {
// 	type: String,
// 	required: true
// },
// dbCollection: {
// 	type: String,
// 	required: true
// },
// create_date: {
// 	type: Date,
// 	default: Date.now()
// }