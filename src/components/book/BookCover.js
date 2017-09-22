import React from 'react';

function BookCover(props) {
  // TODO: Check which one is better
  /* <img src={props.image + '.jpg'} width="128" height="193" alt="" /> */
  return (
    <div
      className="book-cover"
      style={{ width: 128, height: 193, backgroundImage: `url(${props.image})` }}
    />
  );
}

export default BookCover;
