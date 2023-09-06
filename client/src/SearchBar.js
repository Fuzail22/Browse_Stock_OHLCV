import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./SearchResults.css";

const SearchBar = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedValueSymbol, setSelectedValueSymbol] = useState(null);
  const searchContainerRef = useRef(null);
  const selectedRef = useRef(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `https://browse-stock-ohlcv-server.onrender.com/api/search?q=${searchQuery}`
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
    props.setSymbol("");
    props.cleanOScreen();
    setShowDropdown(true);
    setSelectedValue(null);
  };

  const handleInputClick = () => {
    setShowDropdown(true);
  };

  const handleItemClick = (value, ticker) => {
    props.setSymbol(ticker);
    props.cleanOScreen();
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
          setSelectedValueSymbol(searchResults[index + 1].ticker);
          return searchResults[index + 1].name;
        }
        setSelectedValueSymbol(searchResults[0].ticker);
        return searchResults[0].name;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedValue((prevValue) => {
        const index = searchResults.findIndex(
          (result) => result.name === prevValue
        );
        if (index > 0) {
          setSelectedValueSymbol(searchResults[index - 1].ticker);
          return searchResults[index - 1].name;
        }
        setSelectedValueSymbol(searchResults[searchResults.length - 1].ticker);
        return searchResults[searchResults.length - 1].name;
      });
    } else if (e.key === "Enter" && selectedValue != null) {
      e.preventDefault();
      props.setSymbol(selectedValueSymbol);
      props.cleanOScreen();
      setSearchQuery(selectedValue);
      setShowDropdown(false);
    }
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "instant",
        block: "center",
      });
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
      <label htmlFor="stockName">Stock Name:</label>
      <input
        id="stockName"
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
                ref={stock.name === selectedValue ? selectedRef : null}
                onClick={() => handleItemClick(stock.name, stock.ticker)}
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
