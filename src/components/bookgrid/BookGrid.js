import React from 'react';
import PropTypes from 'prop-types';
import Book from '../book/Book';

const propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
  onUpdateBook: PropTypes.func.isRequired,
};

const defaultProps = {
  books: [],
};

function BookGrid({ books, onUpdateBook }) {
  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map(book => (
          <li key={book.id}>
            <Book book={book} onUpdateBook={onUpdateBook} />
          </li>
        ))}
      </ol>
    </div>
  );
}

BookGrid.propTypes = propTypes;
BookGrid.defaultProps = defaultProps;

export default BookGrid;
