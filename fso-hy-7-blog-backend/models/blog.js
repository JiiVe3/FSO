const MONGODB_URI = process.env.MONGODB_URI
const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Blog = mongoose.model('Blog', blogSchema)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = mongoose.model('Blog', blogSchema)