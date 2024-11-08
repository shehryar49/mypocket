import React, { useEffect, useState } from "react";
import SearchBarLayout from "./SearchBarLayout";

const SearchResults = ({
  setFilteredSearch,
  savedPasswords,
  filteredSearch,
}) => {
  const [searchInput, setSearchInput] = useState("");

 
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchInput(searchValue);

    const filtered = savedPasswords.filter((data) => {
      const isEmailMatch = data.email.toLowerCase().includes(searchValue);
      const isDateMatch = data.date.toLowerCase().includes(searchValue);
      return isEmailMatch || isDateMatch;
    });
    setFilteredSearch(filtered);
  };
  return (
    <div>
      <SearchBarLayout
        handleSearch={handleSearch}
        searchInput={searchInput}
        filteredSearch={filteredSearch}
      />
    </div>
  );
};

export default SearchResults;
