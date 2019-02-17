import React, { Component } from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';

const placeHolderText = [
  'try Berlin?',
  'try London?',
  'Looing for Museum?',
  'Looing for boat trip?',
  'Looing for walking tour?'
];

const LastSearchResults = ({histories, onSetResults}) => {
  if(histories.length === 0)
    return null;
  const latestSearch = histories.slice(0, 4);
  return latestSearch.map(search =>
    <LastSearch key={search.keyword} className="button is-medium" onClick={() => onSetResults(search)}>
        <span>{search.keyword}</span>
    </LastSearch>
  );
};

export const SearchBar = ({onChange, onKeyPress, onDelete, searchText, histories, onSetResults}) =>
  <section className="hero is-info">
    <div className="hero-body">
      <div className="container">
        <div className="card">
          <div className="card-content">
            <div className="content">
              <div className="control has-icons-left has-icons-right search-field">
                <input
                  className="input is-large"
                  type="text"
                  placeholder={placeHolderText[Math.floor(Math.random() * 5)]}
                  onChange={onChange}
                  onKeyPress={onKeyPress}
                  value={searchText}
                />
                <span className="icon is-medium is-left"><i className="fa fa-search"></i></span>
                <span className="icon is-medium is-right">
                  <i onClick={onDelete} className="delete is-medium clear-search"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
         <LastSearchResults className="button is-medium" histories={histories} onSetResults={onSetResults} />
      </div>
    </div>
  </section>;

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  histories: PropTypes.array.isRequired,
  onSetResults: PropTypes.func.isRequired,
}

const LastSearch = styled.a`
  margin: 20px 10px 0px 30px;
  color: black;
  span {
    color: black; 
  }
`;
