import React from 'react';
import PropTypes from 'prop-types';
import BookShelfChanger from './BookShelfChanger';
import BookCover from './BookCover';
import BookModel from '../../model/BookModel';

const propTypes = {
  book: PropTypes.instanceOf(BookModel),
  onUpdateBook: PropTypes.func.isRequired,
};

const defaultProps = {
  book: {},
};

const Book = ({ book, onUpdateBook }) => {
  this.handleShelfUpdate = (updatedShelfEvent) => {
    const updatedBook = Object.assign(new BookModel({}), book, {
      shelf: updatedShelfEvent.target.value,
    });
    onUpdateBook(updatedBook);
  };

  return (
    <div className="book">
      <div className="book-top">
        <BookCover image={book.imageLinks.thumbnail} />
        <BookShelfChanger onUpdateShelf={this.handleShelfUpdate} currentShelf={book.shelf} />
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors}</div>
    </div>
  );
};

Book.propTypes = propTypes;
Book.defaultProps = defaultProps;

export default Book;
