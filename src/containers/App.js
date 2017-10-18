import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import SearchPage from '../components/SearchPage';
import HomePage from '../components/HomePage';
import * as BookRepository from '../BookRepository';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: [],
      searchResult: {
        books: [],
        query: '',
        hasError: false,
      },
    };
    this.handleShelfUpdate = this.handleShelfUpdate.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount = () => {
    BookRepository.getAllBooks().then((allBooks) => {
      this.setState({ allBooks });
    });
  };

  handleShelfUpdate(book) {
    BookRepository.update(book).then((updatedBook) => {
      this.setState(prevState => ({
        allBooks: prevState.allBooks.filter(b => b.id !== book.id).concat([updatedBook]),
      }));
    });
  }

  handleSearch({ target }) {
    const { value } = target;
    this.setState({
      searchResult: {
        books: [],
        query: value,
        hasError: false,
      },
    });
    if (!value) {
      this.resetSearch();
      return;
    }
    BookRepository.search(value, this.state.allBooks).then((searchResult) => {
      this.setState({ searchResult });
    });
  }

  resetSearch() {
    this.setState({
      searchResult: {
        books: [],
        query: '',
        hasError: false,
      },
    });
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <HomePage allBooks={this.state.allBooks} onUpdateBook={this.handleShelfUpdate} />
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
