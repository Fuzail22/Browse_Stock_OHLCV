import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const LineStockChart = ({ data }) => {
  const chartData = [
    { name: "Open", value: data.open },
    { name: "High", value: data.high },
    { name: "Low", value: data.low },
    { name: "Close", value: data.close },
  ];

  return (
    <div>
      <LineChart width={600} height={400} data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default LineStockChart;
