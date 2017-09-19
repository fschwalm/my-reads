import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Bookshelf from './bookshelf/Bookshelf';

const propTypes = {
  // TODO: Change to Shelves
  books: PropTypes.object,
  onUpdateBook: PropTypes.func,
};

const defaultProps = {
  book: {},
};

function HomePage({ books, onUpdateBook }) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf
            title="Currently Reading"
            books={books.currentlyReading}
            onUpdateBook={onUpdateBook}
          />
          <Bookshelf
            title="Want to Read"
            books={books.wantToRead}
            onUpdateBook={onUpdateBook}
          />
          <Bookshelf
            title="Read"
            books={books.read}
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
