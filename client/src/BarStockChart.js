import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const BarStockChart = ({ data }) => {
  const chartData = [
    { name: "Open", value: data.open },
    { name: "High", value: data.high },
    { name: "Low", value: data.low },
    { name: "Close", value: data.close },
  ];

  return (
    <div>
      <BarChart width={600} height={400} data={chartData}>
        <XAxis dataKey="name" />
        <YAxis interval={0} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default BarStockChart;
