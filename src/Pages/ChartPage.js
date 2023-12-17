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
import chartStyle from "../assets/style/Chart.module.css";
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
      <h2 className={chartStyle.december}>12월 통계</h2>
      <div className={chartStyle.chartContainer}>
        <LineChart
          width={395}
          height={250}
          data={accountdata}
          margin={{ top: 25, right: 0, left: 0, bottom: 0 }}>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total" stroke="#8884d8" />
        </LineChart>
      </div>

      <h3>카테고리별 지출</h3>
      <div className={chartStyle.chartContainer}>
        <LineChart
          width={395}
          height={250}
          data={categoryData}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <XAxis dataKey="category" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          {/* Assuming you have 'total' as the property for category-wise expense */}
          <Line dataKey="total" fill="#82ca9d" />
        </LineChart>
      </div>
    </>
  );
};
export default ChartPage;
