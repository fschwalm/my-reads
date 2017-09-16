import React from 'react';
import BookGrid from '../book/BookGrid';

function Bookshelf(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <BookGrid books={props.books} />
    </div>
  );
}

export default Bookshelf;
