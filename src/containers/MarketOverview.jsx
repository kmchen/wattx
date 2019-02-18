import React, { Component } from "react";
import { connect } from 'react-redux'

import { Table } from "../components/Table";
import BaseContainer from "./BaseContainer";

export class MarketOverviewContainer extends Component {
  constructor() {
    super();
  }

  render() {
    let data = this.props.topList ?  this.props.data.slice(0, this.props.topList) : this.props.data;
    return (
      <BaseContainer>
        <Table data={this.props.data}/>
      </BaseContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.data,
    topList: state.topList
  }
};

const MarketOverview = connect(
  mapStateToProps
)(MarketOverviewContainer);

export default MarketOverview;
