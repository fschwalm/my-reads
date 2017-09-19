import React from 'react';
import _ from 'underscore';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css';
import SearchPage from './components/SearchPage';
import HomePage from './components/HomePage';
import {Book} from './model/Book';

class BooksApp extends React.Component {

  state = {
    books: {}
  };

  constructor() {
    super();
    this.handleShelfUpdate = this.handleShelfUpdate.bind(this);
  }

  componentDidMount = () => {
    BooksAPI.getAll().then((response) => {
      // this.setState( { books: response } );
      // TODO: Extract logic to BookService
      this.setState(state => ({
        books: _.groupBy(response.map(_book => new Book(_book)), 'shelf')
      }));
    });
  }

  handleShelfUpdate(book) {
    console.log(book);
    BooksAPI.update(book, book.shelf).then(response => {
      // TODO: Update state.books
      console.log(response);
    });
  }

  render() {
    return (
      <div className="app">
      <Route
          exact
          path="/"
          render={() => (<HomePage
            books={this.state.books}
            onUpdateBook={this.handleShelfUpdate}
          />)}
        />
        <Route
          path="/search"
          render={() => (<SearchPage
            onUpdateBook={this.handleShelfUpdate}
          />)}
        />
      </div>
    )
  }
}

export default BooksApp
