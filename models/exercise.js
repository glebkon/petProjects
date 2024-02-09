let mongoose = require('mongoose')
let validator = require('validator')

let exerciseSchema = new mongoose.Schema({
  _userId: mongoose.Schema.Types.ObjectId,
  description: String,
  duration: Number,
  date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Exercise', exerciseSchema)