import React from 'react';
import { SyncLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import BookGrid from '../bookgrid/BookGrid';
import BookModel from '../../model/BookModel';

const propTypes = {
  searchResultBooks: PropTypes.arrayOf(PropTypes.instanceOf(BookModel)),
  isWaitingResponse: PropTypes.bool,
  hasError: PropTypes.bool,
  query: PropTypes.string,
  onUpdateBook: PropTypes.func.isRequired,
};

const defaultProps = {
  searchResultBooks: [],
  isWaitingResponse: false,
  hasError: false,
  query: '',
};

function SearchResult({
  searchResultBooks, isWaitingResponse, hasError, query, onUpdateBook,
}) {
  return (
    <div className="search-books-results">
      {!isWaitingResponse &&
        !hasError &&
        searchResultBooks.length > 0 && (
          <BookGrid onUpdateBook={onUpdateBook} books={searchResultBooks} />
        )}
      {!isWaitingResponse &&
        hasError && (
          <p className="align-center">
            <b>
              <u>{query}</u>
            </b>&nbsp;not found.
          </p>
        )}
      {isWaitingResponse && (
        <div className="align-center">
          <SyncLoader margin="2" size={9} color="#52d4eb" loading={isWaitingResponse} />
        </div>
      )}
    </div>
  );
}

SearchResult.propTypes = propTypes;
SearchResult.defaultProps = defaultProps;

export default SearchResult;
