import React from 'react';
import PropTypes from 'prop-types';
import BookGrid from './bookgrid/BookGrid';
import SearchBar from './search-bar/SearchBar';
import BookModel from '../model/BookModel';

const propTypes = {
  searchResult: PropTypes.shape({
    books: PropTypes.arrayOf(PropTypes.instanceOf(BookModel)),
    query: PropTypes.any,
    hasError: PropTypes.boolean,
  }),
  onSearch: PropTypes.func.isRequired,
  onUpdateBook: PropTypes.func.isRequired,
};

const defaultProps = {
  searchResult: {
    books: [],
    query: '',
    hasError: false,
  },
};

function SearchPage({ searchResult, onSearch, onUpdateBook }) {
  const { books, query, hasError } = searchResult;
  const isDefaultState = query === '' && books.length === 0 && hasError === false;
  const noResultForQuery = query !== '' && books.length === 0 && hasError;

  return (
    <div className="search-books">
      <SearchBar onSearch={onSearch} />
      <div className="search-books-results">
        {books.length > 0 && <BookGrid onUpdateBook={onUpdateBook} books={books} />}
        {isDefaultState ? null : (
          <div>
            {noResultForQuery ? (
              <p className="books-grid">No results for {query}</p>
            ) : (
              <p className="books-grid">Loading...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

SearchPage.propTypes = propTypes;
SearchPage.defaultProps = defaultProps;

export default SearchPage;
