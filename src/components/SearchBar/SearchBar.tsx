import React from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
}

class SearchBar extends React.Component<SearchBarProps> {
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(event);
  };

  render() {
    return (
      <input
        type="text"
        placeholder="Search..."
        onChange={this.handleChange}
        className="search-input"
        value={this.props.searchTerm}
      />
    );
  }
}

export default SearchBar;
