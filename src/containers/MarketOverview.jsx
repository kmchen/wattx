import React, { Component } from "react";
import { connect } from 'react-redux'

import { Table } from "../components/Table";
import BaseContainer from "./BaseContainer";

export class MarketOverviewComponent extends Component {
  constructor() {
    super();
  }

  render() {
    let data = this.props.topList ?  this.props.data.slice(0, this.props.topList) : this.props.data;
    return (
      <BaseComponent>
        <Table data={data}/>
      </BaseComponent>
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
)(MarketOverviewComponent);

export default MarketOverview;
