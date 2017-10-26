import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  currentShelf: PropTypes.oneOf(['currentlyReading', 'wantToRead', 'read', 'none', 'moveTo']),
  onUpdateShelf: PropTypes.func.isRequired,
};

const defaultProps = {
  currentShelf: 'none',
};

class BookShelfChanger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentShelf: props.currentShelf,
    };
    this.handleShelfUpdate = this.handleShelfUpdate.bind(this);
    this.update = this.update.bind(this);
  }
  handleShelfUpdate(event) {
    this.props.onUpdateShelf(event, this.update);
  }

  update(shelf) {
    this.setState({ currentShelf: shelf });
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.state.currentShelf} onChange={this.handleShelfUpdate}>
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
