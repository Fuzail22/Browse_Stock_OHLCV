import React, { useState } from "react";
import SearchBar from "./SearchBar";
function StockForm({ onSubmit, cleanOScreen }) {
  const [symbol, setSymbol] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [dateError, setDateError] = useState(null);
  const handleSymbolChange = (e) => {
    setSymbol(e.target.value);
    cleanOScreen();
  };
  const handleDateChange = async (e) => {
    const selectedDate = e.target.value;
    const selectedDay = new Date(selectedDate).getDay();
    cleanOScreen();
    if (selectedDay === 0 || selectedDay === 6) {
      setSelectedDate("");
      setDateError("Market is closed on weekend. Please choose a weekday");
      return;
    }
    setSelectedDate(e.target.value);
    setDateError(null);
  };
  // useEffect(() => {}, [dateError, selectedDate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ symbol, selectedDate });
  };

  const today = new Date();
  const twoYearsAgo = new Date(today);
  twoYearsAgo.setFullYear(today.getFullYear() - 2);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const minDate = twoYearsAgo.toISOString().slice(0, 10);
  const maxDate = yesterday.toISOString().slice(0, 10);

  return (
    <form onSubmit={handleSubmit}>
      <SearchBar setSymbol={setSymbol} cleanOScreen={cleanOScreen} />
      <div>
        <label htmlFor="symbol">Stock Symbol:</label>
        <input
          type="text"
          id="symbol"
          value={symbol}
          onChange={handleSymbolChange}
          required
        />
      </div>
      {dateError && <p style={{ color: "red" }}>{dateError}</p>}
      <div>
        <label htmlFor="date">Select Date:</label>

        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
          required
          min={minDate}
          max={maxDate}
        />
      </div>
      {!dateError && <button type="submit">Submit</button>}
    </form>
  );
}

export default StockForm;
