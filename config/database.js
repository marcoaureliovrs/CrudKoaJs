const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

module.exports = mongoose
        .connect('mongodb://localhost/listadetarefas')
        .then((response) => {
          console.log('Created connection to MongoDB')
        })
        .catch((err) => {
          console.log("Error in connection to MongoDB")
          console.log(err);
        })