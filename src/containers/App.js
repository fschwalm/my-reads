import React from 'react';
import _ from 'underscore';
import { Route } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import './App.css';
import SearchPage from '../components/SearchPage';
import HomePage from '../components/HomePage';
import BookModel from '../model/BookModel';

class BooksApp extends React.Component {
  constructor() {
    super();
    // TODO: Initialize possible shelves.
    this.state = {
      shelfGroup: {},
      searchResult: [],
    };
    this.handleShelfUpdate = this.handleShelfUpdate.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount = () => {
    BooksAPI.getAll().then((response) => {
      this.setState({ shelfGroup: _.groupBy(response.map(book => new BookModel(book)), 'shelf') });
    });
  };

  handleShelfUpdate(book, goToShelf) {
    BooksAPI.update(book, goToShelf).then(
      (response) => {
        this.setState((prevState) => {
          const shelfGroup = Object.assign({}, prevState.shelfGroup);
          // remove
          shelfGroup[book.shelf] = _.without(shelfGroup[book.shelf], book);
          // update book
          book.shelf = goToShelf;
          // TODO: Check None
          // add
          shelfGroup[goToShelf].unshift(book);
          // update state
          return { shelfGroup };
        });
      },
      (error) => {
        console.error(error);
      },
    );
  }

  handleSearch(event) {
    const value = event.target.value;
    if (!value) return;
    // TODO: Extract to a BookService
    BooksAPI.search(value, 20).then((results) => {
      if (results.error) {
        this.setState({ searchResult: [] });
      } else {
        this.setState({ searchResult: results.map(book => new BookModel(book)) });
      }
      console.log(results);
    });
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <HomePage shelfGroup={this.state.shelfGroup} onUpdateBook={this.handleShelfUpdate} />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchPage
              searchResult={this.state.searchResult}
              onSearch={this.handleSearch}
              onUpdateBook={this.handleShelfUpdate}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
