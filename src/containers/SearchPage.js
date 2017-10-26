import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../components/search-bar/SearchBar';
import BookModel from '../model/BookModel';
import SearchResult from '../components/searchResult/SearchResult';

const propTypes = {
  searchResultBooks: PropTypes.arrayOf(PropTypes.instanceOf(BookModel)),
  isWaitingResponse: PropTypes.bool,
  hasError: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
  onUpdateBook: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired,
};

const defaultProps = {
  searchResultBooks: [],
  isWaitingResponse: false,
  hasError: false,
};

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
    this.performSearch = this.performSearch.bind(this);
  }

  performSearch({ target }) {
    const { value } = target;
    if (!value) {
      this.props.onClearSearch();
      this.setState({ query: '' });
      return;
    }
    this.setState({ query: value });
    this.props.onSearch(this.state.query);
  }

  render() {
    const {
      searchResultBooks, isWaitingResponse, hasError, onUpdateBook,
    } = this.props;
    return (
      <div className="search-books">
        <SearchBar onSearch={this.performSearch} />
        {this.state.query !== '' && (
          <SearchResult
            searchResultBooks={searchResultBooks}
            isWaitingResponse={isWaitingResponse}
            hasError={hasError}
            query={this.state.query}
            onUpdateBook={onUpdateBook}
          />
        )}
      </div>
    );
  }
}

SearchPage.propTypes = propTypes;
SearchPage.defaultProps = defaultProps;

export default SearchPage;
