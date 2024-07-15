import React from 'react';
import './SearchBar.css';

interface SearchBarProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
}

function SearchBar({ handleChange, searchQuery }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search by name..."
      onChange={handleChange}
      className="search-input"
      value={searchQuery}
    />
  );
}

export default SearchBar;
