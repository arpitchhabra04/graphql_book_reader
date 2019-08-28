import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";

class BookList extends Component {
  state = {};
  render() {
    console.log(this.props);

    const displayBooks = () => {
      var data = this.props.data;
      if (data.loading) {
        return <div>Loading Books....</div>;
      } else {
        return data.books.map(book => {
          return (
            <div>
              <li key={book.id}>{book.name}</li>
            </div>
          );
        });
      }
    };
    return (
      <div id="book-list">
        <ul>{displayBooks()}</ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
