import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password
    ) {
      token
    }
  }
`

export const ME = gql`
  query {
    me {
      username,
      favoriteGenre
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name,
      born,
      bookCount,
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title,
      published,
      author {
        name
      },
      genres,
      id
    }
  }
`

export const BOOKS_BY_GENRE = gql`
  query booksByGenre($genre: String!) {
    allBooks(genre: $genre) {
      title,
      published,
      author {
        name
      },
      genres,
      id
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const EDIT_BORN = gql`
  mutation editBorn($name: String!, $setBorn: Int!) {
    editAuthor(
      name: $name,
      setBorn: $setBorn
    ) {
      name,
      born,
      bookCount,
      id
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title,
      published,
      genres,
      id
    }
  }
`

export const AUTHOR_ADDED = gql`
  subscription {
    authorAdded {
      name,
      born,
      id
    }
  }
`