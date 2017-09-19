import React from 'react';
import PropTypes from 'prop-types';
import BookGrid from '../book/BookGrid';

const propTypes = {
  title: PropTypes.string,
  books: PropTypes.array,
  onUpdateBook: PropTypes.func,
};

const defaultProps = {
  title: '',
  books: [],
};

function Bookshelf({ title, books, onUpdateBook }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <BookGrid onUpdateBook={onUpdateBook} books={books} />
    </div>
  );
}

Bookshelf.propTypes = propTypes;
Bookshelf.defaultProps = defaultProps;

export default Bookshelf;
