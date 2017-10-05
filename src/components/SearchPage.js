import React from 'react';
import BookGrid from './bookgrid/BookGrid';
import SearchBar from './search-bar/SearchBar';
import * as BooksAPI from '../BooksAPI';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    const value = event.target.value;
    if (!value) return;
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
        <SearchBar onSearch={this.handleSearch} />
        <div className="search-books-results">
          {/* TODO: show message to empty results */}
          <BookGrid onUpdateBook={this.props.onUpdateBook} books={this.state.results} />
        </div>
      </div>
    );
  }
}

export default SearchPage;
