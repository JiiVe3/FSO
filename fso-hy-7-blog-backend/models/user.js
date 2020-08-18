const MONGODB_URI = process.env.MONGODB_URI
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  username: {
      type: String,
      minlength: 3,
      required: true,
      unique: true
  },
  name: {
    type: String
  },
  passwordHash: {
    type: String,
    required: true
  },
  blogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = mongoose.model('User', userSchema)