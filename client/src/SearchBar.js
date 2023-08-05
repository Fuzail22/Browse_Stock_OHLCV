import React, { useState } from "react";
import axios from "axios";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/search?q=${searchQuery}`
      );
      console.log(response);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching stocks:", error.message);
      // Handle error
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Stock Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {searchResults.map((stock) => (
          <li key={stock._id}>{stock.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
