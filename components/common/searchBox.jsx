import React from "react";
import inputnStyles from '../../styles/Input.module.css'

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      className={inputnStyles.input}
      placeholder="Search here..."
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;