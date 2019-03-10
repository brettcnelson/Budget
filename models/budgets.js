const mongoose = require('mongoose');

const budgetSchema = mongoose.Schema({
	budget: {
		type: Object,
		required: true
	}
});

module.exports = mongoose.model('budgets', budgetSchema);
