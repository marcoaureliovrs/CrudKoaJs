const Task = require('../models/task')

exports.getTasks = async (ctx) => {
	const tasks = await Task.find({})
	if (!tasks) {
		throw new Error("There was an error retrieving your tasks.")
	} else {
		ctx.body = tasks
		ctx.status = 200
	}
}

exports.createTask = async (ctx) => {
	const result = await Task.create({
		name: ctx.request.body.name,
		description: ctx.request.body.description,
		created_on: new Date(),
		updated_on: new Date(),
	})
	if (!result) {
		throw new Error('Task failed to create.')
	} else {
		ctx.body = {message: 'Task created!', data: result}
		ctx.status = 200
	}
}

exports.updateTask = async (ctx) => {
	const searchByName = {name: ctx.request.body.name}
	const update = {name: ctx.request.body.newName, description: ctx.request.body.newDescription, updated_on: new Date()}
	const result = await Task.findOneAndUpdate(searchByName, update)
	if (!result) {
		throw new Error('Failed to update task')
	} else {
		ctx.body = {message: 'Task updated!', data: result}
		ctx.status = 200
	}
}

exports.deleteTask = async (ctx) => {
	const result = await Task.findOneAndRemove({name: ctx.request.body.name})
	if (!result) {
		throw new Error('Task failed to delete.')
	} else {
		ctx.body = {message: 'success!'}
		ctx.status = 204
	}
}
