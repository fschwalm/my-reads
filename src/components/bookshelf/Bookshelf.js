import React from 'react';
import { BeatLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import BookGrid from '../bookgrid/BookGrid';
import BookModel from '../../model/BookModel';

const propTypes = {
  title: PropTypes.string,
  books: PropTypes.arrayOf(PropTypes.instanceOf(BookModel)),
  onUpdateBook: PropTypes.func.isRequired,
};

const defaultProps = {
  title: '',
  books: [],
};

function Bookshelf({
  title, books, isWaitingResponse, onUpdateBook,
}) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      {!isWaitingResponse ? (
        <BookGrid onUpdateBook={onUpdateBook} books={books} />
      ) : (
        <div className="align-center">
          <BeatLoader margin="2" size={9} color="#52d4eb" loading={isWaitingResponse} />
        </div>
      )}
    </div>
  );
}

Bookshelf.propTypes = propTypes;
Bookshelf.defaultProps = defaultProps;

export default Bookshelf;
