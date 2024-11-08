import React from "react";
import { RiSearch2Line } from "react-icons/ri";

const SearchBarLayout = ({ filteredSearch, searchInput, handleSearch }) => {
  return (
    <div className="flex justify-center items-center flex-grow mt-6 w-full">
      <div className="relative w-80 md:w-2/3 lg:w-1/2">
        {/* Search Input Container */}
        <div className="flex items-center dark:bg-gray-600 dark:focus-within:bg-gray-700 dark:shadow-sm dark:shadow-gray-400 bg-gray-200 rounded-full shadow-md focus-within:ring-2 focus-within:bg-blue-100 focus-within:ring-blue-400 transition">
          {/* Search Icon */}
          <RiSearch2Line
            className="ml-4 text-gray-600 dark:text-gray-300 dark:hover:text-blue-400 cursor-pointer hover:text-blue-500 transition duration-200"
            size={24}
          />
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by Email or Date"
            value={searchInput}
            onChange={handleSearch}
            className="bg-transparent dark:text-gray-200 dark:placeholder:text-gray-400 w-full py-2 px-4 text-gray-700 placeholder:text-gray-600 rounded-r-full focus:outline-none"
          />
        </div>

        {/* Search Results */}
        {searchInput && (
          <div className="absolute z-10 w-full dark:bg-gray-800 dark:shadow-sm dark:shadow-gray-500 bg-white mt-2 rounded-lg shadow-lg overflow-hidden">
            {filteredSearch.length === 0 ? (
              <div className="text-gray-700 p-4 dark:text-gray-300">
                No results found
              </div>
            ) : (
              <ul className="max-h-60 overflow-y-auto">
                {filteredSearch.map((data, index) => (
                  <li
                    key={index}
                    className="flex justify-between dark:text-gray-200 dark:hover:bg-blue-600 items-center p-3 hover:bg-blue-100 text-sm text-gray-700 transition duration-200"
                  >
                    <span className="font-medium">{data.serialNumber}</span>
                    <span>{data.email}</span>
                    <span className="text-gray-500 dark:text-gray-400">{data.date}</span>
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
