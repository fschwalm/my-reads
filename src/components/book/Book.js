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

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.book = props.book;
    this.onUpdateBook = props.onUpdateBook;
    this.handleShelfUpdate = this.handleShelfUpdate.bind(this);
  }

  handleShelfUpdate(updatedShelfEvent, callback) {
    const updatedBook = Object.assign(new BookModel({}), this.book, {
      shelf: updatedShelfEvent.target.value,
    });
    this.onUpdateBook(updatedBook, callback);
  }

  render() {
    const {
      imageLinks, shelf, title, authors,
    } = this.book;
    return (
      <div className="book">
        <div className="book-top">
          <BookCover image={imageLinks.thumbnail} />
          <BookShelfChanger onUpdateShelf={this.handleShelfUpdate} currentShelf={shelf} />
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    );
  }
}

Book.propTypes = propTypes;
Book.defaultProps = defaultProps;

export default Book;
