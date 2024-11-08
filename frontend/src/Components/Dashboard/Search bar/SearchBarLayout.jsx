import React from "react";
import { RiSearch2Line } from "react-icons/ri";

const SearchBarLayout = ({ searchInput, handleSearch, filteredSearch }) => {
  return (
    <div className="flex justify-start items-center flex-grow w-full">
      <div className="relative w-72 md:w-2/3 lg:w-1/2">
        {/* Search Input Container */}
        <div className="flex items-center bg-gray-200 dark:bg-gray-600 dark:shadow-sm dark:shadow-gray-400 rounded-full shadow-md focus-within:ring-2 focus-within:bg-blue-100 dark:focus-within:bg-gray-700 focus-within:ring-blue-400 transition">
          {/* Search Icon */}
          <RiSearch2Line
            className="ml-4 text-gray-600 dark:text-gray-300 cursor-pointer hover:text-blue-500 dark:hover:text-blue-400 transition duration-200"
            size={24}
          />
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearch}
            className="bg-transparent w-full py-2 px-4 text-gray-700 dark:text-gray-200 placeholder:text-gray-600 dark:placeholder:text-gray-400 rounded-r-full focus:outline-none"
          />
        </div>

        {/* Search Results */}
        {searchInput && (
          <div className="absolute z-10 w-full bg-white dark:bg-gray-800 dark:shadow-sm dark:shadow-gray-500 mt-2 rounded-lg shadow-lg overflow-hidden">
            {filteredSearch.length === 0 ? (
              <div className="text-gray-700 dark:text-gray-300 p-4">
                No results found
              </div>
            ) : (
              <ul className="max-h-60 overflow-y-auto">
                {filteredSearch.map((data, index) => (
                  <li
                    key={index}
                    className="flex justify-between cursor-pointer items-center p-3 hover:bg-blue-100 dark:hover:bg-blue-600 text-sm text-gray-700 dark:text-gray-200 transition duration-200"
                  >
                    <span className="font-medium">{data.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBarLayout;
