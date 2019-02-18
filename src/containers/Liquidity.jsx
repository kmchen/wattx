import React, { Component } from "react";
import { connect } from 'react-redux'

import { Nav } from "../components/Nav";
import { Chart } from "../components/Chart";
import BaseContainer from "./BaseContainer";

export class LiquidityComponent extends Component {
  constructor() {
    super();
  }

  render() {
    let data = this.props.topList ?  this.props.data.slice(0, this.props.topList) : this.props.data;
    let assetInfo = data.map(val => (
      {
        name: val.name,
        x: val.marketCap.toFixed(2),
        y: val.volume.toFixed(2),
        z: val.priceChange.toFixed(2)
      }
    ));
    return (
      <BaseContainer>
        <Chart data={assetInfo}/>
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

const Liquidity = connect(
  mapStateToProps
)(LiquidityComponent);

export default Liquidity;
