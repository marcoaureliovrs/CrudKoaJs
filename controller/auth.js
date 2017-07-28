const auth = require ('../models/user')
const jwt = require('jsonwebtoken')

exports.enter = async (ctx) => {
	const result = await auth.findOne({
		login: ctx.request.body.login, 
		passwd: ctx.request.body.passwd
	})
	console.log(result)
	if(!result) {
		throw new Error("login or password invalid")
	} else {
		var token = jwt.sign({login: ctx.request.body.login}, 'apenasumteste', {expiresIn:84500})
		ctx.set('Authorization', token)
		ctx.status = 200
	}
}

exports.verifyToken = async (ctx, next) => {
	const token = ctx.header.authorization
	if (!token) {
		throw new Error("No have token.")
	} else {	
		let decoded = jwt.verify(token, 'apenasumteste')
		if(!decoded) {
			throw new Error("Invalid token")
		} 
		return next()	
	}
}