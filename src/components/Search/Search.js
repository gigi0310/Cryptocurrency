import React from "react";

const Search = ({ onSearch }) => {
  const onInputChange = (value) => {
    onSearch(value);
  };
  return (
    <div className="coin-search">
      <h1 className="coin-text">Search a currency</h1>
      <form>
        <input
          type="text"
          className="coin-input"
          placeholder="Search"
          onChange={(e) => onInputChange(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Search;
