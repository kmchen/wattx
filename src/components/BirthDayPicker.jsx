import React, { useState } from "react";
import DatePicker from "react-datepicker";

const styles = {
  errMsg: {
    color: 'red',
    fontSize: '12px',
    marginLeft: '10px'
  }
};

export const BirthDayPicker = ({data, title, onChange}) => {
  const [selectedDate, setselectedDate] = useState(null);
  const onSelect = (selectedDate) => {
    const date = new Date(selectedDate);
    setselectedDate(date);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    onChange({
      value: `${year}${month}${day}`,
      errMsg: ''
    });
  }; 
  return (
    <div className="field">
      <label className="label">
        <span>{title}</span>
        <span style={styles.errMsg} >{data.errMsg}</span>
      </label>
      <DatePicker
        scrollableYearDropdown={true}
        showYearDropdown={true}
        showMonthDropdown={true}
        maxDate={new Date()}
        selected={selectedDate}
        onChange={onSelect}
      />
    </div>
  )
}
