import React from 'react';
import _ from 'underscore';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import SearchPage from './components/SearchPage';
import HomePage from './components/HomePage';

class BooksApp extends React.Component {
  constructor() {
    super();
    this.handleShelfUpdate = this.handleShelfUpdate.bind(this);
  }
  // TODO: Initialize possible shelves.
  state = {
    shelfGroup: {},
  };

  componentDidMount = () => {
    BooksAPI.getAll().then((response) => {
      this.setState({ shelfGroup: _.groupBy(response, 'shelf') });
    });
  };

  // TODO: Check None
  handleShelfUpdate(book, goToShelf) {
    BooksAPI.update(book, goToShelf).then((response) => {
      // remove
      this.state.shelfGroup[book.shelf] = _.without(this.state.shelfGroup[book.shelf], book);
      // update book
      book.shelf = goToShelf;
      // add
      this.state.shelfGroup[goToShelf].unshift(book);
      // update state
      this.setState({ shelfGroup: this.state.shelfGroup });
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
        <Route path="/search" render={() => <SearchPage onUpdateBook={this.handleShelfUpdate} />} />
      </div>
    );
  }
}

export default BooksApp;
