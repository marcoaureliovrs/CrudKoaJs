/*
  Include modules
*/
const koa = require('koa')
const convert = require('koa-convert')
const bodyParser = require('koa-bodyparser')
const router = require('koa-simple-router')
const error = require('koa-json-error')
const logger = require('koa-logger')
const koaRes = require('koa-res')
const handleError = require('koa-handle-error')
const task = require('./controller/tarefas')
const user = require('./controller/user')
const auth = require('./controller/auth')
const app = new koa()
require('./config/database')


/*
  Configuration to Server
*/
// Error Handling
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = err.message
    ctx.app.emit('error', err, ctx)
  }
});


// logging
app.use(logger())

// body parsing
app.use(bodyParser())

// Format response as JSON
app.use(convert(koaRes()))


// Config Routes
app.use(router(_ => {
  _.get('/user', user.getUser),
  _.post('/user', user.createUser)
}))


app.use(router(_ => {
  _.post('/auth', auth.enter),
  _.all('/*', auth.verifyToken)
}))

  

app.use(router(_ => {
  _.get('/tasks', task.getTasks),
  _.post('/task', task.createTask),
  _.put('/task', task.updateTask),
  _.delete('/task', task.deleteTask)
}))


module.exports = app.listen(3000)

