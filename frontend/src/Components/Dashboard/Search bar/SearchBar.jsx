import React, { useState } from "react";
import SearchBarLayout from "./SearchBarLayout";

const SearchBar = ({ files }) => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredSearch, setFilteredSearch] = useState([]);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchInput(searchValue);

    const filtered = files.filter((file) =>
      file.name.toLowerCase().includes(searchValue)
    );

    setFilteredSearch(filtered);
  };
  return (
    <div>
      <SearchBarLayout
        searchInput={searchInput}
        handleSearch={handleSearch}
        filteredSearch={filteredSearch}
      />
    </div>
  );
};

export default SearchBar;
