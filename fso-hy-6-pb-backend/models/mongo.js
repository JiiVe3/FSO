const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true
  }
})

personSchema.plugin(uniqueValidator)

const Person = mongoose.model('Person', personSchema)

module.exports = mongoose.model('Person', personSchema)