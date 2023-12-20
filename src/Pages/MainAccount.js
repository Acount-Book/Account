import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useHistory } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import MainAdditem from "../components/main/MainAdditem";
import Dropdown from "../components/main/Dropdown";
import { useExpenseContext } from "../context/ExpenseContext";
import mainStyle from "../assets/style/Main.module.css";
const MainAccount = () => {
  const path = process.env.PUBLIC_URL;
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
  } = useExpenseContext();
  const navigate = useNavigate(); // Add useNavigate hook
  const location = useLocation(); // Add useLocation hook

  const calculateMonthlyTotal = () => {
    let total = 0;
    for (const date in filteredExpenses) {
      filteredExpenses[date].forEach((expense) => {
        total += parseFloat(expense.amount) || 0;
      });
    }
    return total.toFixed();
  };
  const filteredExpenses = filterExpensesByMonth();

  const handleDeleteExpense = (date, expenseIndex) => {
    // Create a new copy of expenses array
    const updatedExpenses = [...expenses];

    // Find the index of the expense to be deleted in the filtered expenses
    const expenseToDeleteIndex = updatedExpenses.findIndex(
      (expense) => expense.date?.toLocaleDateString() === date
    );

    // If the index is valid, delete the expense from the array
    if (expenseToDeleteIndex !== -1) {
      updatedExpenses.splice(expenseToDeleteIndex, 1);

      // Update the expenses state with the new array
      setExpenses(updatedExpenses);
    }
  };
  const handleButtonClick = () => {
    setIstoggle(!istoggle);
    navigate("/additem");
    // Navigate to the "/mainadditem" route
  };

  if (
    window.location.pathname === "/lotto" ||
    window.location.pathname === "/chart" ||
    window.location.pathname === "/aim"
  ) {
    return null;
  }
  const sortedDates = Object.keys(filteredExpenses).sort(
    (a, b) => new Date(a) - new Date(b)
  );
  return (
    <>
      <div className={mainStyle.textMain}>
        <div className={mainStyle.titleBox}>
          <Dropdown setSelectedMonth={setSelectedMonth} />
          <div className={mainStyle.expenseWrapper}>
            <h2>나만의 가계부</h2>
            <p>월지출: {calculateMonthlyTotal()}￦</p>
          </div>
        </div>

        <ul className={mainStyle.ulWrapper}>
          {sortedDates.map((date, index) => (
            <section key={index} className={mainStyle.container}>
              <h3>{date}</h3>
              <ul>
                {filteredExpenses[date].map((expense, expenseIndex) => (
                  <li key={expenseIndex} className={mainStyle.categoryWrapper}>
                    <div>
                      <strong>카테고리:</strong> {expense.category} &nbsp;
                      <strong>지출:</strong> {expense.amount}
                    </div>

                    <button
                      className={mainStyle.delBtn}
                      onClick={() => handleDeleteExpense(date, expenseIndex)}>
                      <img
                        src={`${path}/images/delete_FILL0_wght400_GRAD0_opsz24.svg`}
                        alt="휴지통"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </ul>
      </div>
      <button onClick={handleButtonClick} className={mainStyle.addBtn}></button>
      {/* {istoggle && (
        <MainAdditem
          handleAddExpense={handleAddExpense} 
          istoggle={istoggle}
          setIstoggle={setIstoggle}
        />
      )} */}
    </>
  );
};

export default MainAccount;
