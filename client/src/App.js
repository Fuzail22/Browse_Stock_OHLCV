import React, { useEffect, useState } from "react";
import StockForm from "./StockForm";
import StockData from "./StockData";
import LineStockChart from "./LineStockChart";
import BarStockChart from "./BarStockChart";
import "./App.css";
import LoadingOverlay from "./LoadingOverlay";
import axios from "axios";

function App() {
  const [stockData, setStockData] = useState(null);
  const [errorDisplay, setErrorDisplay] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://browse-stock-ohlcv-server.onrender.com/")
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(
          "The following error occured while checking server is up and running: ",
          error
        );
      });
  }, []);
  const handleFormSubmit = async ({ symbol, selectedDate }) => {
    // console.log("Symbol:", symbol);
    // console.log("Selected Date:", selectedDate);
    const requestData = {
      symbol: symbol,
      selectedDate: selectedDate,
    };

    try {
      setLoading(true);
      const response = await fetch(
        "https://browse-stock-ohlcv-server.onrender.com/api/fetchStockData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );
      if (!response.ok) {
        setStockData(null);
        const errorData = await response.json();
        setErrorDisplay(errorData);
        throw new Error("Server response in not ok");
      }
      setErrorDisplay(null);
      const data = await response.json();
      // console.log(data);
      setLoading(false);
      setStockData(data);
    } catch (error) {
      console.error("The following error occured during fetch: ", error);
    }
  };
  const cleanOutputScreen = () => {
    setStockData(null);
    setErrorDisplay(null);
    return;
  };
  return (
    <>
      {loading && <LoadingOverlay />}
      <div className={loading ? "disabled-content" : ""}>
        <div className="container">
          <h1 style={{ color: "#514e7f" }}>Browse Stock</h1>
          <div className="form-container">
            <StockForm
              onSubmit={handleFormSubmit}
              cleanOScreen={cleanOutputScreen}
            />
          </div>
          {errorDisplay && (
            <div className="error-message" style={{ color: "red" }}>
              <h3>{errorDisplay}</h3>
            </div>
          )}
          {!errorDisplay && !stockData && (
            <p style={{ color: "red", textAlign: "justify", fontSize: "2vh" }}>
              <div
                style={{
                  color: "#514e7f",
                  textAlign: "center",
                  fontSize: "3vh",
                }}
              >
                Welcome to Browse Stock!
              </div>
              If this is your first time visiting (or) if you've been inactive
              for 15 minutes, please note that there may be a slight delay of up
              to 2 minutes for the first request as our free server needs to
              start up.
            </p>
          )}
          {stockData && (
            <div>
              <StockData data={stockData} />
              <div className="charts-container">
                <div className="line-chart">
                  <LineStockChart data={stockData} />
                </div>
                <div className="bar-chart">
                  <BarStockChart data={stockData} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
