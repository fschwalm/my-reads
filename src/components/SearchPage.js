import React from 'react';
import { Debounce } from 'react-throttle';
import { Link } from 'react-router-dom';
import BookGrid from './book/BookGrid';
import * as BooksAPI from '../BooksAPI';

class SearchPage extends React.Component {
  state = {
    query: '',
    results: []
  };

  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    let value = event.target.value;
    // TODO: Verificar o motivo de chamar conforme o número de letras.
    BooksAPI.search(value, 20).then((results) => {
      if(results.error) {
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
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
        <Debounce time="800" handler="onChange">
          <input type="text" onKeyUp={this.handleSearch} placeholder="Search by title or author"/>
        </Debounce>
        </div>
      </div>
      <div className="search-books-results">
        <BookGrid books={this.state.results} />
      </div>
    </div>
    )
  }
}

export default SearchPage;
