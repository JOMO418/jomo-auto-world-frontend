// src/components/common/SearchBar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBar = ({ placeholder = "Search for parts...", className = "" }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/parts?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full px-6 py-4 pr-14 bg-white dark:bg-navy text-dark dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:outline-none transition-all"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-red-700 text-white p-3 rounded-lg transition-colors duration-200"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>
    </form>
  );
};

export default SearchBar;