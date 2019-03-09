import React, { useState } from "react";

const styles = {
  errMsg: {
    color: 'red',
    fontSize: '12px',
    marginLeft: '10px'
  }
};

export const Dropdown = ({onChange, data, options, title, defaultValue}) => {
  const [isActive, setIsActive] = useState(false);
  const showOptions = isActive ? 'is-active' : '';
  const keys = Object.keys(options);
  let dropdownList = [
    <option disabled={true} key={'default'}>{defaultValue}</option>
  ];
  keys.map(key => {
    dropdownList.push(<option key={key}>{key}</option>)
  });
  const onSelect = (event) => {
    onChange({value: event.target.value, errMsg: data.errMsg});
  } 
  return (
    <div style={{marginBottom: '0.75rem'}}>
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
