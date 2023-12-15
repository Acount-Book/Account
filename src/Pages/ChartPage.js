import React from "react";
import { Bar } from "react-chartjs-2";
import { useExpenseContext } from "../context/ExpenseContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
} from "recharts";
import Chart from "chart.js/auto";

const ChartPage = () => {
  const {
    istoggle,
    setIstoggle,
    expenses,
    setExpenses,
    selectedMonth,
    setSelectedMonth,
    handleAddExpense,
    filterExpensesByMonth,
    groupedExpenses,
    groupExpensesByDate,
    filteredExpenses,
    generateChartData,
    groupedExpensesByCategory,
    accountdata,
    categoryData,
  } = useExpenseContext();

  return (
    <>
      <h2>12월 통계</h2>
      <LineChart
        width={460}
        height={250}
        data={accountdata}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total" stroke="#8884d8" />
      </LineChart>
      <h3>카테고리별 지출</h3>
      <LineChart
        width={460}
        height={250}
        data={categoryData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="category" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        {/* Assuming you have 'total' as the property for category-wise expense */}
        <Line dataKey="total" fill="#82ca9d" />
      </LineChart>
    </>
  );
};
export default ChartPage;
