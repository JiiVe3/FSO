require('dotenv').config()
const { ApolloServer, gql, UserInputError, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const MONGODB_URI = process.env.MONGODB_URI
const SECRET = process.env.MONGODB_URI

const pubsub = new PubSub()

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    token: String!
  }

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
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token

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

  type Subscription {
    bookAdded: Book!
    authorAdded: Author!
  }
`

const resolvers = {
  Query: {
    me: (root, args, { currentUser }) => currentUser,
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
    createUser: (root, args) => {
      const user = new User({ username: args.username })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'pass1234' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { token: jwt.sign(userForToken, SECRET) }
    },
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

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
        if (isNewAuthor) pubsub.publish('AUTHOR_ADDED', { authorAdded: author })
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
      } catch (error) {
        if (isNewAuthor) author.delete()
        return new UserInputError(error.message)
      }
      return Book.findById(book.id).populate('author')
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

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
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
    authorAdded: {
      subscribe: () => pubsub.asyncIterator(['AUTHOR_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})