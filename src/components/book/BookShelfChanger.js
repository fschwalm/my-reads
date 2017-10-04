import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  currentShelf: PropTypes.oneOf(['currentlyReading', 'wantToRead', 'read', 'none', 'moveTo']),
  onUpdateShelf: PropTypes.func.isRequired,
};

const defaultProps = {
  currentShelf: 'none',
};

function BookShelfChanger({ currentShelf, onUpdateShelf }) {
  return (
    <div className="book-shelf-changer">
      <select value={currentShelf} onChange={onUpdateShelf}>
        <option value="moveTo" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
}

BookShelfChanger.propTypes = propTypes;
BookShelfChanger.defaultProps = defaultProps;

export default BookShelfChanger;
