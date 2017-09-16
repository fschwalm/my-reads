export class Book {
  constructor({ id, title, subtitle, authors, imageLinks, shelf }) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.authors = authors;
    this.imageLinks = imageLinks;
    this.shelf = shelf;
  }
}
