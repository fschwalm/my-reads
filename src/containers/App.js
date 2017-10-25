import React from 'react';
import { Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';
import SearchPage from '../components/SearchPage';
import HomePage from '../components/HomePage';
import * as BookRepository from '../BookRepository';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: [],
      searchResultBooks: [],
      hasError: false,
      isWaitingResponse: false,
    };
    this.handleShelfUpdate = this.handleShelfUpdate.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  componentDidMount = () => {
    this.setState({ isWaitingResponse: true });
    BookRepository.getAllBooks()
      .then((allBooks) => {
        this.setState({ allBooks, isWaitingResponse: false });
      })
      .catch((error) => {
        this.setState({ hasError: true, isWaitingResponse: false });
      });
  };

  handleShelfUpdate(book) {
    // this.setState({ isWaitingResponse: true });
    BookRepository.update(book)
      .then((updatedBook) => {
        this.setState(prevState => ({
          allBooks: prevState.allBooks.filter(b => b.id !== book.id).concat([updatedBook]),
          isWaitingResponse: false,
        }));
      })
      .then(() => {
        toast.info(`The book: ${book.title} was moved to ${book.shelf}`, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      });
  }

  handleSearch(query) {
    this.setState({ isWaitingResponse: true });
    BookRepository.search(query, this.state.allBooks)
      .then((searchResultBooks) => {
        this.setState({ searchResultBooks, hasError: false, isWaitingResponse: false });
      })
      .catch((error) => {
        this.setState({ searchResultBooks: [], hasError: true, isWaitingResponse: false });
      });
  }

  clearSearch() {
    this.setState({ searchResultBooks: [], hasError: false });
  }

  render() {
    return (
      <div className="app">
        <ToastContainer />
        <Route
          exact
          path="/"
          render={() => (
            <HomePage
              allBooks={this.state.allBooks}
              isWaitingResponse={this.state.isWaitingResponse}
              onUpdateBook={this.handleShelfUpdate}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchPage
              searchResultBooks={this.state.searchResultBooks}
              isWaitingResponse={this.state.isWaitingResponse}
              hasError={this.state.hasError}
              onSearch={this.handleSearch}
              onUpdateBook={this.handleShelfUpdate}
              onClearSearch={this.clearSearch}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
