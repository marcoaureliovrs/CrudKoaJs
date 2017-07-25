const mongoose = require ('mongoose')
const schema = mongoose.Schema({
	login: {
		type: String,
		required: true
	},
	passwd: {
		type: String,
		required:true
	}
});

module.exports = mongoose.model('Usuario', schema);
