// ExpenseContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [istoggle, setIstoggle] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };
  const groupExpensesByDate = () => {
    const groupedExpenses = {};
    expenses.forEach((expense) => {
      const dateKey = expense.date?.toLocaleDateString();
      if (dateKey) {
        if (!groupedExpenses[dateKey]) {
          groupedExpenses[dateKey] = [];
        }
        groupedExpenses[dateKey].push(expense);
      }
    });
    return groupedExpenses;
  };
  const groupExpensesByCategory = () => {
    const groupedByCategory = {};
    expenses.forEach((expense) => {
      const categoryKey = expense.category;
      if (!groupedByCategory[categoryKey]) {
        groupedByCategory[categoryKey] = [];
      }
      groupedByCategory[categoryKey].push(expense);
    });
    return groupedByCategory;
  };
  const groupedExpensesByCategory = groupExpensesByCategory();
  const groupedExpenses = groupExpensesByDate();
  const filterExpensesByMonthLogic = (selectedMonth, groupedExpenses) => {
    if (!selectedMonth) {
      return groupedExpenses;
    }

    const filteredExpenses = {};
    Object.keys(groupedExpenses).forEach((date) => {
      const expenseMonth = new Date(date).getMonth() + 1; // getMonth() returns 0-based index
      if (expenseMonth === selectedMonth) {
        filteredExpenses[date] = groupedExpenses[date];
      }
    });
    return filteredExpenses;
  };

  const filterExpensesByMonth = () => {
    return filterExpensesByMonthLogic(selectedMonth, groupExpensesByDate());
  };

  const filteredExpenses = filterExpensesByMonth();
  const generateChartData = () => {
    const monthlyData = [];
    for (const date in filteredExpenses) {
      const total = filteredExpenses[date].reduce(
        (acc, expense) => acc + parseFloat(expense.amount) || 0,
        0
      );
      monthlyData.push({
        date,
        total,
      });
    }
    const sortedMonthlyData = monthlyData.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    return sortedMonthlyData;
  };
  const [chartData, setChartData] = useState([]);

  const generateCategoryData = () => {
    const categoryData = [];
    for (const category in groupedExpensesByCategory) {
      const total = groupedExpensesByCategory[category].reduce(
        (acc, expense) => acc + parseFloat(expense.amount) || 0,
        0
      );
      categoryData.push({
        category,
        total: total.toFixed(0), // Format the total to fixed decimal places
      });
    }
    return categoryData;
  };
  const [catedata, setcateData] = useState([]);
  const categoryData = generateCategoryData();
  useEffect(() => {
    setcateData(categoryData);
  }, []);
  const accountdata = generateChartData();
  useEffect(() => {
    setChartData(accountdata);
  }, [expenses]);

  return (
    <ExpenseContext.Provider
      value={{
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
        groupedExpensesByCategory,
        generateChartData,
        accountdata,
        categoryData,
      }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => {
  return useContext(ExpenseContext);
};
