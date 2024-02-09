let mongoose = require('mongoose')
let validator = require('validator')

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
})

module.exports = mongoose.model('User', userSchema)