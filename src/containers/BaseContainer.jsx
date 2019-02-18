import React, { Component } from "react";
import { connect } from 'react-redux'

import { Nav } from "../components/Nav";
import { TOP_LIST } from "../actions/actions";

export class BaseContainerWrapper extends Component {
  constructor() {
    super();
  }

  selectTopList = number => {
    this.props.selectTopList(number);
  }

  render() {
    return (
      <section className="hero is-fullheight is-default is-bold">
        <Nav selectTopList={this.selectTopList} />
        { this.props.children }
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    topList: state.topList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectTopList: number => {
      dispatch({type: TOP_LIST, payload: number})
    }
  }
}

const BaseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseContainerWrapper);

export default BaseContainer;

