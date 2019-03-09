import React, { useState } from "react";

const styles = {
  errMsg: {
    color: 'red',
    fontSize: '12px',
    marginLeft: '10px'
  }
};

export const InputField = ({data, title, onChange}) => {
  const onInputChange = (event) => {
    onChange({value: event.target.value, errMsg: data.errMsg});
  } 
  return (
    <div className="field">
      <label className="label">
        <span>{title}</span>
        <span style={styles.errMsg} >{data.errMsg}</span>
      </label>
      <div className="control">
        <input className="input" type="text" onChange={onInputChange} />
      </div>
    </div>
  )
}
