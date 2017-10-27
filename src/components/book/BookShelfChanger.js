import React from 'react';
import PropTypes from 'prop-types';
import { BounceLoader } from 'react-spinners';

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
      isUpdating: false,
    };
    this.handleShelfUpdate = this.handleShelfUpdate.bind(this);
    this.update = this.update.bind(this);
  }
  handleShelfUpdate(event) {
    this.setState({ isUpdating: true });
    this.props.onUpdateShelf(event, this.update);
  }

  update(shelf) {
    this.setState({ currentShelf: shelf, isUpdating: false });
  }

  render() {
    const { isUpdating, currentShelf } = this.state;
    return (
      <div>
        {isUpdating ? (
          <div className="book-shelf-loading">
            <BounceLoader size={50} color="#5ac8fa" loading />
          </div>
        ) : (
          <div className="book-shelf-changer">
            <select value={currentShelf} onChange={this.handleShelfUpdate}>
              <option value="moveTo" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        )}
      </div>
    );
  }
}

BookShelfChanger.propTypes = propTypes;
BookShelfChanger.defaultProps = defaultProps;

export default BookShelfChanger;
