require('dotenv').config()
const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String]!
    ) : Book

    editAuthor(
      name: String!
      setBorn: Int!  
    ) : Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const filter = {}
      if (args.author) {
        const author = await Author.findOne({name: args.author})
        filter.author = author.id
      }
      if (args.genre) filter.genres = {$in: args.genre}
      return Book.find(filter).populate('author')
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      const books = await Book.find({})
      authors.forEach(author => {
        author.bookCount = books.filter(book => book.author == author.id).length
      })
      return authors
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({name: args.author})
      let isNewAuthor = false
      if (!author) {
        author = new Author({name: args.author})

        try {
          await author.save()
          isNewAuthor = true
        } catch (error) {
          return new UserInputError(error.message)
        }
      }
      const book = new Book({
        title: args.title,
        published: args.published,
        author: author.id,
        genres: args.genres
      })

      try {
        await book.save()
      } catch (error) {
        if (isNewAuthor) author.delete()
        return new UserInputError(error.message)
      }
      return Book.findById(book.id).populate('author')
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({name: args.name})
      if (!author) return new UserInputError('Author not found', {invalidArgs: args.name})
      author.born = args.setBorn
      try {
        await author.save()
      } catch (error) {
        return new UserInputError(error.message)
      }
      return author
    } 
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})