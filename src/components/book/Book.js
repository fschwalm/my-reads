import React from 'react';
import PropTypes from 'prop-types';
import BookShelfChanger from './BookShelfChanger';
import BookCover from './BookCover';

const propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    authors: PropTypes.arrayOf(PropTypes.string),
    imageLinks: PropTypes.object,
    shelf: PropTypes.string,
  }),
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

  handleShelfUpdate(updatedShelfEvent) {
    this.onUpdateBook(this.book, updatedShelfEvent.target.value);
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <BookCover image={this.book.imageLinks.thumbnail} />
          <BookShelfChanger onUpdateShelf={this.handleShelfUpdate} currentShelf={this.book.shelf} />
        </div>
        <div className="book-title">{this.book.title}</div>
        <div className="book-authors">{this.book.authors}</div>
      </div>
    );
  }
}

Book.propTypes = propTypes;
Book.defaultProps = defaultProps;

export default Book;
