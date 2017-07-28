const request = require('supertest-as-promised')
const app = require('../index')


describe("List Users", function () {
    it("List all users in application", function (done) {
        request.agent(app)
            .get("/user")
            .expect(200)
            .end(function(err) {
    			if (err) throw err;
    			console.log('Success!');
  			});
})
})



describe("Register new User", function () {
    it("Register a new user", function (done) {
        request.agent(app)
            .post("/user")
            .send({
            	"login":"teste",
				"passwd":"123"
            })
            .expect(200)
            .end(function(err) {
    			if (err) throw err;
    			console.log('Success!');
  			});
})
})