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
    // TODO: Initialize possible shelves.
    this.state = {
      shelfGroup: {},
    };
    this.handleShelfUpdate = this.handleShelfUpdate.bind(this);
  }

  componentDidMount = () => {
    BooksAPI.getAll().then((response) => {
      this.setState({ shelfGroup: _.groupBy(response, 'shelf') });
    });
  };

  // TODO: Check None
  handleShelfUpdate(book, goToShelf) {
    BooksAPI.update(book, goToShelf).then(
      (response) => {
        this.setState((prevState) => {
          const shelfGroup = Object.assign({}, prevState.shelfGroup);
          // remove
          shelfGroup[book.shelf] = _.without(shelfGroup[book.shelf], book);
          // update book
          book.shelf = goToShelf;
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
