import React, { Component } from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableHeader = () =>
  <thead>
    <tr>
      <th>Rank</th>
      <th>Name</th>
      <th>Price</th>
      <th>Price Change (24h)</th>
      <th>Market Cap</th>
      <th>Volume (24h)</th>
    </tr>
  </thead>;

const TableRows = ({data}) => {
  let rows = [];
  data.forEach((val, key) => {
    rows.push(
      <tr key={val.name}>
        <td>{val.rank}</td>
        <td>{val.name}</td>
        <td>{val.price.toFixed(2)}</td>
        <td>{val.priceChange.toFixed(2)}</td>
        <td>{val.marketCap.toFixed(2)}</td>
        <td>{val.volume.toFixed(2)}</td>
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
}

export const Table = ({data}) =>
  <TableContainer>
    <table className="table is-bordered is-fullwidth">
      <TableHeader />
      <TableRows data={data} />
    </table>
  </TableContainer>

const TableContainer = styled.div`
  overflow-x: auto;
`;

Table.propTypes = {
  data: PropTypes.array.isRequired,
}
