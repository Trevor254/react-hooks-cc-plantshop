import React from "react";

const Search = ({ handleSearch }) => {
  const handleInputChange = (e) => {
    handleSearch(e.target.value);
  };

  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        onChange={handleInputChange}
      />
    </div>
  );
}

export default Search;