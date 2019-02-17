import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux'
import Fuse from 'fuse.js';

import { Nav } from "./components/Nav";
import { Sort } from "./components/Sort";
import { Results } from "./components/Results";
import { SearchBar } from "./components/SearchBar";
import { PUSH_SEARCH_RESULT } from './actions/actions';

export class AppComponent extends Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      results: [],
      priceSortOrder: null,
      ratingSortOrder: null,
      priceSortName: 'Price',
      ratingSortName: 'Rating'
    };
  }

  componentDidMount() {
    //if(this.state.results.length === 0) {
      //const specialOffers = this.props.data.filter(x => x.isSpecialOffer);
      //this.setState({results: specialOffers});
    //}
  }

  onSearchTextChange = (event) => {
    this.setState({ searchText: event.target.value });
  }

  onSearch = (event) => {
    if(event.key === 'Enter') {
      if (this.state.searchText === '') {
        return; 
      }
      const fuse = new Fuse(this.props.data, options);
      const searchResults = fuse.search(this.state.searchText);
      this.setState({ results: searchResults});
      this.props.pushSearchResults({keyword: this.state.searchText, result: searchResults})
    }
  }

  onDelete = () => {
    this.setState({searchText: ''});
  }

  onSetResults = (histories) => {
    this.setState({results: histories.result, searchText: histories.keyword});
  }

  sortByPrice = () => {
    const { priceSortOrder } = this.state;
    const newResults = this.state.results.slice();
    const sortedResults = newResults.sort(this.compare('price'));
    if (!priceSortOrder) {
      this.setState({
        priceSortOrder: 'ACS',
        priceSortName: 'Price↑',
        ratingSortOrder: null,
        ratingSortName: 'Rating',
        results: sortedResults
      });
      return
    }
    if (priceSortOrder === 'ACS') {
      this.setState({
        priceSortOrder: 'DESC',
        priceSortName: 'Price↓',
        ratingSortOrder: null,
        ratingSortName: 'Rating',
        results: sortedResults.reverse()
      });
      return
    }
    if (priceSortOrder === 'DESC') {
      this.setState({
        priceSortOrder: 'ACS',
        priceSortName: 'Price↑',
        ratingSortOrder: null,
        ratingSortName: 'Rating',
        results: sortedResults
      });
    }
  }

  sortByRating = () => {
    const { ratingSortOrder } = this.state;
    const newResults = this.state.results.slice();
    const sortedResults = newResults.sort(this.compare('rating'));
    if (!ratingSortOrder) {
      this.setState({
        ratingSortOrder: 'ACS',
        ratingSortName: 'Rating↑',
        priceSortOrder: null,
        priceSortName: 'Price',
        results: sortedResults
      });
      return
    }
    if (ratingSortOrder === 'ACS') {
      this.setState({
        ratingSortOrder: 'DESC',
        ratingSortName: 'Rating↓',
        priceSortOrder: null,
        priceSortName: 'Price',
        results: sortedResults.reverse()
      });
      return
    }
    if (ratingSortOrder === 'DESC') {
      this.setState({
        ratingSortOrder: 'ACS',
        ratingSortName: 'Rating↑',
        priceSortOrder: null,
        priceSortName: 'Price',
        results: sortedResults
      });
    }
  }

  compare = field => {
    return (a, b) => {
      if (a[field] < b[field])
          return -1;
      if (a[field] > b[field])
          return 1;
      return 0;
    };
  }

  render() {
    return (
      <>
        <section className="hero is-fullheight is-default is-bold">
          <Nav />
        </section>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.data,
    histories: state.histories
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    pushSearchResults: results => {
      dispatch({type: PUSH_SEARCH_RESULT, payload: results})
    }
  }
}

const options = {
	shouldSort: true,
	threshold: 0.0,
	location: 0,
	distance: 100,
	maxPatternLength: 32,
	minMatchCharLength: 1,
	keys: [
		'title',
		'price',
		'currency',
		'rating',
		'isSpecialOffer'
	]
};

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);

export default App;
