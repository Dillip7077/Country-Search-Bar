import React, { useState, useEffect } from 'react';
import countryData from './countriesData';
import './SearchBar.css';
import logo1 from '../assets/logo1.png'; 
import logo2 from '../assets/logo2.png'; 

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query.length > 0) {
      const filteredSuggestions = countryData.filter(country =>
        country.country.toLowerCase().includes(query.toLowerCase()) ||
        country.capital.toLowerCase().includes(query.toLowerCase())
      ).map(country => ({
        label: `${country.country} (${country.capital})`
      }));
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <img src={logo1} alt="Logo 1" className="logo-left" />
        <input
          type="text"
          placeholder="Search any country or capital"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <img src={logo2} alt="Logo 2" className="logo-right" />
      </div>
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="suggestion-item"
              onClick={() => {
                setQuery(suggestion.label);
                setSuggestions([]);
              }}
            >
              {suggestion.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
