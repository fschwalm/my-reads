import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Bookshelf from './bookshelf/Bookshelf';
import BookModel from '../model/BookModel';

const propTypes = {
  allBooks: PropTypes.arrayOf(PropTypes.instanceOf(BookModel)),
  onUpdateBook: PropTypes.func.isRequired,
};

const defaultProps = {
  allBooks: [],
};

function HomePage({ allBooks, onUpdateBook }) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf
            title="Currently Reading"
            books={allBooks.filter(book => book.shelf === 'currentlyReading')}
            onUpdateBook={onUpdateBook}
          />
          <Bookshelf
            title="Want to Read"
            books={allBooks.filter(book => book.shelf === 'wantToRead')}
            onUpdateBook={onUpdateBook}
          />
          <Bookshelf
            title="Read"
            books={allBooks.filter(book => book.shelf === 'read')}
            onUpdateBook={onUpdateBook}
          />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

HomePage.propTypes = propTypes;
HomePage.defaultProps = defaultProps;

export default HomePage;
