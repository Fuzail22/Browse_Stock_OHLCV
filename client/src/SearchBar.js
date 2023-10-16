import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import axios from "axios";
import { debounce } from "debounce";
import {
  List,
  CellMeasurer,
  CellMeasurerCache,
  AutoSizer,
} from "react-virtualized";
import "./SearchBar.css";
let requestCount = 0;
// let responseCount = 0;
const SearchBar = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedValueSymbol, setSelectedValueSymbol] = useState(null);
  const searchContainerRef = useRef(null);
  const selectedRef = useRef(null);
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 10,
  });
  function calcHeight() {
    if (searchResults.length == 1) {
      return 40;
    } else if (searchResults.length == 2) {
      return 80;
    } else if (searchResults.length == 3) {
      return 120;
    }
    return 160;
  }
  function renderRow({ index, key, style, parent }) {
    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        {({ registerChild }) => (
          <li
            style={style}
            className="row"
            ref={registerChild}
            onClick={() =>
              handleItemClick(
                searchResults[index].name,
                searchResults[index].ticker
              )
            }
          >
            {searchResults[index].name}
          </li>
        )}
      </CellMeasurer>
    );
  }
  let fetchSearchResults = useCallback((searchQuery) => {
    requestCount++;
    console.log("Request no:" + requestCount + " " + searchQuery);
    const config = {
      headers: {
        "X-Request-Id": requestCount,
      },
    };
    axios
      .get(
        `https://browse-stock-ohlcv-server.onrender.com/api/search?q=${searchQuery}`,
        config
      )
      .then((response) => {
        const reqid = response.headers["x-request-id"];
        // responseCount++;
        // console.log("Response no:" + responseCount + " Id:" + reqid);
        if (reqid == requestCount) {
          // console.log("displaying");
          setSearchResults(response.data);
        }
      })
      .catch((error) => {
        // responseCount++;
        console.error("Error searching stocks:", error.message);
      });
  }, []);

  const debouncedfetch = useMemo(() => {
    return debounce(fetchSearchResults, 300);
  }, [fetchSearchResults]);

  useMemo(() => {
    if (searchQuery.trim() !== "") {
      debouncedfetch(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, debouncedfetch]);

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
        type="search"
        placeholder="Search Stock Name"
        value={searchQuery}
        onChange={handleChange}
        onClick={handleInputClick}
        onKeyDown={handleKeyDown}
      />
      {showDropdown && searchResults.length > 0 && (
        <div className="search-dropdown">
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                width={width}
                height={calcHeight()}
                deferredMeasurementCache={cache}
                rowHeight={cache.rowHeight}
                rowRenderer={renderRow}
                rowCount={searchResults.length}
                overscanRowCount={3}
              />
            )}
          </AutoSizer>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
