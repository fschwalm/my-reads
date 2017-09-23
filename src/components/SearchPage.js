import React from 'react';
import { Debounce } from 'react-throttle';
import { Link } from 'react-router-dom';
import BookGrid from './bookgrid/BookGrid';
import * as BooksAPI from '../BooksAPI';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  state = {
    query: '',
    results: [],
  };

  handleSearch(event) {
    const value = event.target.value;
    // TODO: Extract to a BookService
    BooksAPI.search(value, 20).then((results) => {
      if (results.error) {
        this.setState({ results: [] });
      } else {
        this.setState({ results });
      }
      console.log(results);
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <Debounce time="500" handler="onKeyUp">
              <input
                type="text"
                onKeyUp={this.handleSearch}
                placeholder="Search by title or author"
              />
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          {/* TODO: show message to empty results */}
          <BookGrid onUpdateBook={this.props.onUpdateBook} books={this.state.results} />
        </div>
      </div>
    );
  }
}

export default SearchPage;
