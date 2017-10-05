import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Debounce } from 'react-throttle';

const propTypes = {
  onSearch: PropTypes.func.isRequired,
};

function SearchBar({ onSearch }) {
  return (
    <div className="search-books-bar">
      <Link className="close-search" to="/">
        Close
      </Link>
      <div className="search-books-input-wrapper">
        <Debounce time="500" handler="onKeyUp">
          <input
            autoFocus
            type="text"
            onKeyUp={onSearch}
            placeholder="Search by title or author"
          />
        </Debounce>
      </div>
    </div>
  );
}

SearchBar.propTypes = propTypes;

export default SearchBar;
