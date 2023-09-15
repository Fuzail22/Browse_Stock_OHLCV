import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineStockChart = ({ data }) => {
  const chartData = [
    { name: "Open", value: data.open },
    { name: "High", value: data.high },
    { name: "Low", value: data.low },
    { name: "Close", value: data.close },
  ];

  return (
    <ResponsiveContainer width="80%" aspect={1 / 1}>
      <LineChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineStockChart;
