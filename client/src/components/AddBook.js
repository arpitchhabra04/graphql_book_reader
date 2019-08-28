import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getAuthorsQuery } from "../queries/queries";

class AuthorList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      genre: "",
      authorId: ""
    };
    this.submitForm = this.submitForm.bind(this);
  }
  displayAuthor = () => {
    var data = this.props.data;
    if (data.loading) {
      return <option disabled>Loading Authors....</option>;
    } else {
      return data.authors.map(author => {
        return <option key={author.id}>{author.name}</option>;
      });
    }
  };
  submitForm(e) {
    e.preventDefault();
    console.log(this.state);
  }
  render() {
    console.log(this.props);

    return (
      <form id="add-book" onSubmit={this.submitForm}>
        <div className="field">
          <label>Book Name:</label>
          <input
            type="text"
            onChange={e => this.setState({ name: e.target.value })}
          ></input>
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            onChange={e => this.setState({ genre: e.target.value })}
          ></input>
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={e => this.setState({ authorId: e.target.value })}>
            <option>Select Author</option> {this.displayAuthor()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default graphql(getAuthorsQuery)(AuthorList);
