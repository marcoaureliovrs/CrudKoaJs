const mongoose = require ('mongoose')

const schema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true	
	},

	created_on: {
		type: Date,
		required: true
	},
	updated_on: {
		type: Date,
		required: true
	}

});

module.exports = mongoose.model('Tarefa', schema);