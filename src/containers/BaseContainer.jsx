import React, { Component } from "react";
import { connect } from 'react-redux'

import { Nav } from "../components/Nav";

export class BaseContainerWrapper extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <>
        <Nav />
        { this.props.children}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.data,
    topList: state.topList
  }
};

const BaseContainer = connect(
  mapStateToProps
)(BaseContainerWrapper);

export default BaseContainer;

