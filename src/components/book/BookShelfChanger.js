import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  currentShelf: PropTypes.oneOf(['currentlyReading', 'wantToRead', 'read', 'none', 'moveTo']),
  onUpdateShelf: PropTypes.func.isRequired,
};

const defaultProps = {
  currentShelf: 'moveTo',
};

class BookShelfChanger extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentShelf: this.props.currentShelf };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props
      .onUpdateShelf(event.target.value)
      .then(newShelf => this.setState({ currentShelf: newShelf }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.state.currentShelf} onChange={this.handleChange}>
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
}

BookShelfChanger.propTypes = propTypes;
BookShelfChanger.defaultProps = defaultProps;

export default BookShelfChanger;
