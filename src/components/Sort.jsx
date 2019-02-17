import React, { Component } from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const Sort = ({sortByPrice, priceSortName, sortByRating, ratingSortName}) => 
  <StyledSort className="box cta">
    <p className="has-text-centered">
      <span>Sort by</span>
      <button onClick={sortByPrice} className="tag is-link">{priceSortName}</button>
      <button onClick={sortByRating} className="tag is-primary">{ratingSortName}</button>
    </p>
  </StyledSort>

Sort.propTypes = {
  sortByPrice: PropTypes.func.isRequired,
  sortByRating: PropTypes.func.isRequired,
  priceSortName: PropTypes.string.isRequired,
  ratingSortName: PropTypes.string.isRequired,
}

const StyledSort = styled.div`
  span {
    margin: 0px 10px 0px 10px; 
    font-size: 16px;
  }
  button {
    margin: 0px 10px 0px 10px; 
    font-size: 16px;
  }
`;
