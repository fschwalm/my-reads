import React from 'react';
import Bookshelf from './bookshelf/Bookshelf';
import * as BooksAPI from '../BooksAPI';
import {Book} from '../model/Book';

class Bookspage extends React.Component {

  state = {
    books: []
  };

  componentWillMount = () => {
    BooksAPI.getAll().then((response) => {
      // this.setState( { books: response } );
      this.setState(state => ({
        // TODO: Group by shelf
        books: response.map(_book => new Book(_book))
      }));
    });
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf title="Currently Reading" books={this.state.books} />
            <Bookshelf title="Want to Read" books={this.state.books} />
            <Bookshelf title="Read" books={this.state.books} />
          </div>
        </div>
        <div className="open-search">
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
    );
  }
}

export default Bookspage;
