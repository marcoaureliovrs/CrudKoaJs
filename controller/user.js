const user = require('../models/user')

exports.createUser = async (ctx) => {
	const result = await user.create({
		login: ctx.request.body.login,
		passwd: ctx.request.body.passwd
	})
	if (!result) {
		throw new Error('failed to create user.')
	} else {
		ctx.body = {message: 'User created!'}
	}
}


exports.getUser = async (ctx) => {
	const users = await user.find({})
	if (!users) {
		throw new Error("There was an error retrieving users.")
	} else {
		ctx.body = users
	}
}
