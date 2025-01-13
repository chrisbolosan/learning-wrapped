import React from 'react';

export const Searchbar = () => {
  return (
    <div className="flex items-center justify-end mb-8">
      <></>
      <div className="relative w-full max-w-md border-2 border-purple-500/20 rounded-xl">
        <input
          type="text"
          placeholder="Search for a space"
          className="w-full bg-gray-800 text-white text-sm py-2 pl-10 pr-4 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <svg
          className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35M16.5 11.5a5 5 0 11-10 0 5 5 0 0110 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Searchbar;
