import { useState } from "react";
import SearchBarLayout from "./SearchBarLayout";

const SearchResults = ({
  setFilteredSearch,
  sharedFilesData,
  filteredSearch,
}) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchInput(searchValue);

    const results = [];

    sharedFilesData.map((file) => {
      if (file.name.toLowerCase().includes(searchValue)) {
        results.push(file);
      }
    });
    setFilteredSearch(results);
  };
  return (
    <div>
      <SearchBarLayout
        filteredSearch={filteredSearch}
        searchInput={searchInput}
        handleSearch={handleSearch}
      />
    </div>
  );
};

export default SearchResults;
