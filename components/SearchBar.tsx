// components/SearchBar.tsx

import React, { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSearch(query);
    };
  
    return (
    <div className = "searchBarContainer">
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="入力して検索..."
          className="search-input"
        />
        <button type="submit" className="search-button">検索</button>
      </form>
    </div>
    );
  };

export default SearchBar;
