import React from 'react';
import PropTypes from 'prop-types';
import BookGrid from './bookgrid/BookGrid';
import SearchBar from './search-bar/SearchBar';

const propTypes = {
  searchResult: PropTypes.arrayOf(PropTypes.object),
  onSearch: PropTypes.func.isRequired,
  onUpdateBook: PropTypes.func.isRequired,
};

const defaultProps = {
  searchResult: [],
};

function SearchPage({ searchResult, onSearch, onUpdateBook }) {
  return (
    <div className="search-books">
      <SearchBar onSearch={onSearch} />
      {searchResult.length > 0 &&
      <div className="search-books-results">
        {/* TODO: show message to empty results */}
        <BookGrid onUpdateBook={onUpdateBook} books={searchResult} />
      </div>
      }
    </div>
  );
}

SearchPage.propTypes = propTypes;
SearchPage.defaultProps = defaultProps;

export default SearchPage;
