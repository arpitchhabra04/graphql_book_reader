import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

class AuthorList extends Component {
  state = {};
  render() {
    console.log(this.props);

    const displayAuthor = () => {
      var data = this.props.data;
      if (data.loading) {
        return <option disabled>Loading Authors....</option>;
      } else {
        return data.authors.map(author => {
          return <option key={author.id}>{author.name}</option>;
        });
      }
    };
    return (
      <form id="add-book">
        <div className="field">
          <label>Book Name:</label>
          <input type="text"></input>
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text"></input>
        </div>
        <div className="field">
          <label>Author:</label>
          <select>{displayAuthor()}</select>
        </div>
      </form>
    );
  }
}

export default graphql(getAuthorsQuery)(AuthorList);
