import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarStockChart = ({ data }) => {
  const chartData = [
    { name: "Open", value: data.open },
    { name: "High", value: data.high },
    { name: "Low", value: data.low },
    { name: "Close", value: data.close },
  ];

  return (
    <ResponsiveContainer width="95%" height={250}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis interval={0} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarStockChart;
