import React from 'react';

interface SearchButtonProps {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ handleClick }) => {
  return <button onClick={handleClick}>Search</button>;
};

export default SearchButton;
