import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
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
  const { accountdata, categoryData } = useExpenseContext();

  const decemberData = accountdata.map((data) => ({
    date: data.date,
    total: data.total,
  }));

  const barChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  const categoryTotal = categoryData.map((data) => data.total);
  const categoryLabels = categoryData.map((data) => data.category);

  return (
    <>
      <h2 className={chartStyle.december}>12월 통계</h2>
      <div className={chartStyle.chartContainer}>
        <Bar
          data={{
            labels: decemberData.map((data) => data.date),
            datasets: [
              {
                label: "지출",
                data: decemberData.map((data) => data.total),
                backgroundColor: "#8884d8",
                barThickness: 30,
              },
            ],
          }}
          options={barChartOptions}
          height={180}
          width={300}
        />
      </div>

      <h3>카테고리별 지출</h3>
      <div className={chartStyle.chartContainer}>
        <Doughnut
          data={{
            labels: categoryLabels,
            datasets: [
              {
                data: categoryTotal,
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#000"],
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </>
  );
};
export default ChartPage;
