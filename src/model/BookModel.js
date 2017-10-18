class BookModel {
  constructor({
    id, title = '', subtitle = '', authors = [], imageLinks = {}, shelf = 'none',
  }) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.authors = authors;
    this.imageLinks = imageLinks;
    this.shelf = shelf;
  }
}

export default BookModel;
