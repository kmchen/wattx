import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux'

import { Nav } from "./components/Nav";
import { Chart } from "./components/Chart";

export class LiquidityComponent extends Component {
  constructor() {
    super();
  }

  render() {
    let data = this.props.data.map(val => (
      {x: val.marketCap.toFixed(2), y: val.volume.toFixed(2), z: val.priceChange.toFixed(2)}
    ))
    return (
      <>
        <section className="hero is-fullheight is-default is-bold">
          <Nav />
          <Chart data={data}/>
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

const Liquidity = connect(
  mapStateToProps
)(LiquidityComponent);

export default Liquidity;
