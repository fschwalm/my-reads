import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

const propTypes = {
  books: PropTypes.array,
};

const defaultProps = {
  books: [],
};

function BookGrid({ books }) {
  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map(book => (
          <li key={book.id}>
            <Book book={book} />
          </li>
        ))}
      </ol>
    </div>
  );
}

BookGrid.propTypes = propTypes;
BookGrid.defaultProps = defaultProps;

export default BookGrid;
