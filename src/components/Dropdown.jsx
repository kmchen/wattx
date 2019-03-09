import React, { useState } from "react";

const styles = {
  errMsg: {
    color: 'red',
    fontSize: '12px',
    marginLeft: '10px'
  },
  wrapper : {
    marginBottom: '0.75rem'
  }
};

export const Dropdown = ({onChange, data, options, title, defaultValue}) => {
  const keys = Object.keys(options);
  let dropdownList = [
    <option disabled={true} key={'default'}>{defaultValue}</option>
  ];
  keys.map(key => {
    dropdownList.push(<option key={key}>{key}</option>)
  });
  const onSelect = (event) => {
    onChange({value: event.target.value, errMsg: ''});
  } 
  return (
    <div style={styles.wrapper}>
      <label className="label">
        <span>{title}</span>
        <span style={styles.errMsg} >{data.errMsg}</span>
      </label>
      <div className="control">
        <div className="select">
          <select onChange={onSelect} defaultValue={defaultValue}>
            { dropdownList }
          </select>
        </div>
      </div>
    </div>
  )
}
