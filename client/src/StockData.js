import React from "react";

function StockData({ data }) {
  return (
    <div className="stock-data-container">
      <h2 className="heading">Stock Data</h2>
      <div className="data-points">
        <p>
          Open:<strong> {data.open}</strong>
        </p>
        <p>
          High: <strong>{data.high}</strong>
        </p>
        <p>
          Low: <strong>{data.low}</strong>
        </p>
        <p>
          Close: <strong>{data.close}</strong>
        </p>
      </div>
      <p className="stock-volume">
        Volume: <strong>{data.volume}</strong>
      </p>
    </div>
  );
}

export default StockData;
