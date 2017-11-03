import BookModel from './model/BookModel';
import * as BooksAPI from './BooksAPI';

const MAX_API_RESULTS = '20';
export const getAllBooks = async () => {
  try {
    const books = await BooksAPI.getAll();
    return Promise.resolve(books.map(book => new BookModel(book)));
  } catch (error) {
    return Promise.reject(error);
  }
};
export const update = async (book) => {
  try {
    await BooksAPI.update(book, book.shelf);
    return Promise.resolve(book);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const search = async (query, allBooks) => {
  try {
    const results = await BooksAPI.search(query, MAX_API_RESULTS);
    if (results.error) {
      return Promise.reject(new Error(results.error));
    }
    const books = results.map(book => new BookModel(book));
    books.forEach((book, index) => {
      allBooks.forEach((bookOnTheShelf) => {
        if (book.id === bookOnTheShelf.id) {
          books[index].shelf = bookOnTheShelf.shelf;
        }
      });
    });
    return Promise.resolve(books);
  } catch (error) {
    return Promise.reject(error);
  }
};
