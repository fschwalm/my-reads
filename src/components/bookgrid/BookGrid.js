import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
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
          <h3>Nothing</h3>
        ) : (
          <CSSTransitionGroup
            className="books-grid"
            transitionName="default-animation"
            transitionAppear
            transitionAppearTimeout={500}
            transitionEnter
            transitionLeave
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            {books.map(book => (
              <li key={book.id}>
                <Book book={book} onUpdateBook={onUpdateBook} />
              </li>
            ))}
          </CSSTransitionGroup>
        )}
      </ol>
    </div>
  );
}

BookGrid.propTypes = propTypes;
BookGrid.defaultProps = defaultProps;

export default BookGrid;
