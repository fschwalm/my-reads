import React from 'react';

class BookShelfChanger extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  // TODO: calls parent or calls directly the received function via props
  handleChange(event) {
    console.log('calls parent');
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.props.currentShelf} onChange={this.handleChange} >
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default BookShelfChanger;
