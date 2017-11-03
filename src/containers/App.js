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

  componentDidMount = async () => {
    this.setState({ isWaitingResponse: true });
    try {
      const allBooks = await BookRepository.getAllBooks();
      this.setState({ allBooks, isWaitingResponse: false });
    } catch (error) {
      this.setState({ hasError: true, isWaitingResponse: false });
    }
  };

  async handleShelfUpdate(book, callback) {
    try {
      const updatedBook = await BookRepository.update(book);
      callback(updatedBook.shelf);
      this.setState(prevState => ({
        allBooks: prevState.allBooks.filter(b => b.id !== book.id).concat([updatedBook]),
      }));
    } catch (error) {
      this.setState({ hasError: true });
    } finally {
      toast.info(`The book: ${book.title} was moved successful!`, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }

  async handleSearch(query) {
    this.setState({ isWaitingResponse: true });
    try {
      const searchResultBooks = await BookRepository.search(query, this.state.allBooks);
      this.setState({ searchResultBooks, hasError: false, isWaitingResponse: false });
    } catch (error) {
      this.setState({ searchResultBooks: [], hasError: true, isWaitingResponse: false });
    }
  }

  clearSearch() {
    this.setState({ searchResultBooks: [], hasError: false });
  }

  render() {
    const {
      allBooks, isWaitingResponse, searchResultBooks, hasError,
    } = this.state;
    return (
      <div className="app">
        <ToastContainer />
        <Route
          exact
          path="/"
          render={() => (
            <HomePage
              allBooks={allBooks}
              isWaitingResponse={isWaitingResponse}
              onUpdateBook={this.handleShelfUpdate}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchPage
              searchResultBooks={searchResultBooks}
              isWaitingResponse={isWaitingResponse}
              hasError={hasError}
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
