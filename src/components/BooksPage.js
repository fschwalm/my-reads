import React from 'react';
import _ from 'underscore';
import { Link } from 'react-router-dom';
import Bookshelf from './bookshelf/Bookshelf';
import * as BooksAPI from '../BooksAPI';
import {Book} from '../model/Book';

class Bookspage extends React.Component {

  state = {
    books: []
  };

  componentDidMount = () => {
    BooksAPI.getAll().then((response) => {
      // this.setState( { books: response } );
      this.setState(state => ({
        books: _.groupBy(response.map(_book => new Book(_book)), 'shelf')
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
            <Bookshelf title="Currently Reading" books={this.state.books.currentlyReading} />
            <Bookshelf title="Want to Read" books={this.state.books.wantToRead} />
            <Bookshelf title="Read" books={this.state.books.read} />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default Bookspage;
