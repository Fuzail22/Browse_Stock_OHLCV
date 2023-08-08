import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./SearchResults.css";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/search?q=${searchQuery}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error searching stocks:", error.message);
      }
    };
    if (searchQuery.trim() !== "") {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    setShowDropdown(true);
    setSelectedValue(null);
  };

  const handleInputClick = () => {
    setShowDropdown(true);
  };

  const handleItemClick = (value) => {
    setSelectedValue(value);
    setSearchQuery(value);
    setShowDropdown(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedValue((prevValue) => {
        const index = searchResults.findIndex(
          (result) => result.name === prevValue
        );
        if (index >= 0 && index < searchResults.length - 1) {
          return searchResults[index + 1].name;
        }
        return searchResults[0].name;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedValue((prevValue) => {
        const index = searchResults.findIndex(
          (result) => result.name === prevValue
        );
        if (index > 0) {
          return searchResults[index - 1].name;
        }
        return searchResults[searchResults.length - 1].name;
      });
    } else if (e.key === "Enter") {
      e.preventDefault();
      setSearchQuery(selectedValue);
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={searchContainerRef} className="search-container">
      <input
        type="text"
        placeholder="Search Stock Name"
        value={searchQuery}
        onChange={handleChange}
        onClick={handleInputClick}
        onKeyDown={handleKeyDown}
      />
      {showDropdown && searchResults.length > 0 && (
        <div className="search-dropdown">
          <ul>
            {searchResults.map((stock) => (
              <li
                key={stock._id}
                className={stock.name === selectedValue ? "selected" : ""}
                onClick={() => handleItemClick(stock.name)}
              >
                {stock.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
