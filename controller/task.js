const Task = require('../models/task')

exports.getTasks = async (ctx) => {
	const tasks = await Task.find({})
	if (!tasks) {
		throw new Error("There was an error retrieving your tasks.")
	} else {
		ctx.body = tasks
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
	}
}

exports.updateTask = async (ctx) => {
	const searchByName = {name: ctx.request.body.name}
	const update = {name: ctx.request.body.newName, urgency: ctx.request.body.newDescription, updated_on: new Date()}
	const result = await Task.findOneAndUpdate(searchByName, update)
	if (!result) {
		throw new Error('Falha ao atualizar tarefa')
	} else {
		console.log(result)
		ctx.body = {message: 'Task updated!', data: result}
	}
}

exports.deleteTask = async (ctx) => {
	const result = await Task.findOneAndRemove({name: ctx.request.body.name})
	if (!result) {
		throw new Error('Task failed to delete.')
	} else {
		ctx.status = 200
		ctx.body = {message: 'success!'}
	}
}
