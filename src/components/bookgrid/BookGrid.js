import React from 'react';
import PropTypes from 'prop-types';
import Book from '../book/Book';
import BookModel from '../../model/BookModel';

const propTypes = {
  books: PropTypes.arrayOf(PropTypes.instanceOf(BookModel)),
  onUpdateBook: PropTypes.func.isRequired,
};

const defaultProps = {
  books: [],
};

function BookGrid({ books, onUpdateBook }) {
  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.length === 0 ? (
          <p>Loading...</p>
        ) : (
          books.map(book => (
            <li key={book.id}>
              <Book book={book} onUpdateBook={onUpdateBook} />
            </li>
          ))
        )}
      </ol>
    </div>
  );
}

BookGrid.propTypes = propTypes;
BookGrid.defaultProps = defaultProps;

export default BookGrid;
