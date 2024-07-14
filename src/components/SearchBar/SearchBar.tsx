import React from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
}

function SearchBar({ onChange, searchQuery }: SearchBarProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={handleChange}
      className="search-input"
      value={searchQuery}
    />
  );
}

export default SearchBar;
