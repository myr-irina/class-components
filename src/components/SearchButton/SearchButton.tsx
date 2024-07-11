import React from 'react';

interface SearchButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
  return <button onClick={onClick}>Search</button>;
};

export default SearchButton;
