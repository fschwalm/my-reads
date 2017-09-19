import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  currentShelf: PropTypes.string,
  onUpdateBook: PropTypes.func
};

const defaultProps = {
  currentShelf: 'moveTo',
};

class BookShelfChanger extends React.Component {

  constructor(props) {
    super(props);
    this.state = {currentShelf: this.props.currentShelf}
    this.handleChange = this.handleChange.bind(this);
  }

  // TODO: calls parent or calls directly the received function via props
  handleChange(event) {
    this.setState({currentShelf: event.target.value})
    this.props.onUpdateShelf(event.target.value);
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.state.currentShelf} onChange={this.handleChange} >
          <option value="moveTo" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

BookShelfChanger.propTypes = propTypes;
BookShelfChanger.defaultProps = defaultProps;

export default BookShelfChanger;
