import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import BookList from "./components/BookList";
import AuthorList from "./components/AddBook";
//apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>List of Books</h1>
        <BookList></BookList>
        <AuthorList></AuthorList>
      </div>
    </ApolloProvider>
  );
}

export default App;
