const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} = graphql;

//dummy data
// var books = [
//   { name: "Name of the Wind", genre: "Fantacy", id: "1", authorId: "1" },
//   { name: "The Final Empire", genre: "Fantacy", id: "2", authorId: "2" },
//   { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" },
//   { name: "The Hero of Ages", genre: "Fantacy", id: "4", authorId: "2" },
//   { name: "The Colour of Magic", genre: "Fantacy", id: "5", authorId: "3" },
//   { name: "The Light Fantastic", genre: "Fantacy", id: "6", authorId: "3" }
// ];

// var authors = [
//   { name: "Patrick Routhfuss", age: 44, id: "1" },
//   { name: "Brandson Sanderson", age: 42, id: "2" },
//   { name: "Terry Pratchett", age: 66, id: "3" }
// ];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    genre: { type: GraphQLString },
    name: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        // return _.find(authors, { id: parent.authorId });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    age: { type: GraphQLString },
    name: { type: GraphQLString },
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db/others
        // return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id });
      }
    },
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
      }
    },
    authors: {
      type: GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLString }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
