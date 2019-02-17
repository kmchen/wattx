import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux'

import { Nav } from "./components/Nav";
import { Table } from "./components/Table";

export class MarketOverviewComponent extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
    };
  }

  render() {
    return (
      <>
        <section className="hero is-fullheight is-default is-bold">
          <Nav />
          <Table data={this.props.data}/>
        </section>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.data,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    pushSearchResults: results => {
      dispatch({type: PUSH_SEARCH_RESULT, payload: results})
    }
  }
}

const MarketOverview = connect(
  mapStateToProps,
  mapDispatchToProps
)(MarketOverviewComponent);

export default MarketOverview;
