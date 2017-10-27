import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  image: PropTypes.string,
};

const defaultProps = {
  image: '',
};

function BookCover({ image }) {
  return (
    <div
      className="book-cover"
      style={{ width: 128, height: 193, backgroundImage: `url(${image})` }}
    />
  );
}

BookCover.propTypes = propTypes;
BookCover.defaultProps = defaultProps;

export default BookCover;
