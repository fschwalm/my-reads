import React from 'react';
import BookShelfChanger from './BookShelfChanger';
import BookCover from './BookCover';

function Book(props) {
  return (
    <div className="book">
      <div className="book-top">
        <BookCover image={props.book.imageLinks.thumbnail}/>
        <BookShelfChanger currentShelf={props.book.shelf}/>
      </div>
      <div className="book-title">{props.book.title}</div>
      <div className="book-authors">{props.book.authors}</div>
    </div>
  );
}

export default Book;
