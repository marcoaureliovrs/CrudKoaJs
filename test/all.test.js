const supertest = require('supertest')
const app = require('../index')
var agent = supertest.agent(app)
var keyJwt
var userTest = {"login":"teste", "passwd":"123"}
var taskTest = { "name":"Task Test", "description": "Thanks for testing"}
var taskUpdateTest = {"name":"Task Test", "newName":"Task Test", "newDescription": "Update Test"}
var taskDeleteTest = {"name":"Task Test"}


describe("All tests", function () {
    
	it("Create user", function(done) {
		agent
			.post("/user")
			.send(userTest)
			.expect(200)
			.end(function(err) {
    			if (err) throw err;
    			done()
			})
	})


    it("Auth on system", function (done) {
        agent
            .post("/auth")
            .send(userTest)
            .expect(200)
            .end(function(err, res) {
    			if (err) throw err;
    			keyJwt = res.header.authorization
    			//console.log(keyJwt)
      			done()
  			})
	})


	it("Create Task", function(done) {
		agent
			.post("/task")
			.set('Authorization', keyJwt)
			.send(taskTest)
			.expect(200)
			.end(function(err, res) {
    			if (err) throw err
    			//console.log(res.body)
    			done()
			})
	})

    it("List all tasks", function(done) {
    	agent
    		.get("/tasks")
    		.set('Authorization', keyJwt)
    		.expect(200)
    		.end(function(err, res) {
    			if (err) throw err;
    			//console.log(res.body.data)
      			done()
  			})
    })


    it("Update Task", function(done) {
    	agent
    		.put("/task")
    		.set('Authorization', keyJwt)
			.send(taskUpdateTest)
			.expect(200)
			.end(function(err, res) {
    			if (err) throw err
    			//console.log(res.body)
    			done()
			})

    })

    it("Delete Task", function(done) {
    	agent
    		.delete("/task")
    		.set('Authorization', keyJwt)
			.send(taskDeleteTest)
			.expect(204)
			.end(function(err, res) {
    			if (err) throw err
    			done()
			})

    })



})
