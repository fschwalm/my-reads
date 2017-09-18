import React from 'react';
// import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom';
import './App.css';
import SearchPage from './components/SearchPage';
import BooksPage from './components/BooksPage';

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
      <Route
          exact
          path="/"
          render={() => (<BooksPage />)}
        />
        <Route
          path="/search"
          render={() => (<SearchPage />)}
        />
      </div>
    )
  }
}

export default BooksApp
