import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { GoalAmountContext } from "../context/GoalAmoutContext";
import { useGoalContext } from "../context/GoalContext";

const AimMainpage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { goalData } = useGoalContext();
  const [showModal, setShowModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate = useNavigate();
  const { goalAmount } = useContext(GoalAmountContext);

  const handleToggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowModal(false);
  };

  const handleCalendarClick = (event) => {
    const isYearAreaClicked = event.target.className.includes(
      "react-calendar__decade-view__years"
    );

    if (isYearAreaClicked) {
      setShowModal(true);
      setShowCalendar(!showCalendar);
    }
  };

  const generateDateRange = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();
    const endDay = new Date(year, month, 0)
      .getDate()
      .toString()
      .padStart(2, "0");
    return `${year}년 ${month
      .toString()
      .padStart(2, "0")}월 01일 ~ ${year}년 ${month
      .toString()
      .padStart(2, "0")}월 ${endDay}일`;
  };

  const toggleCalendar = () => {
    setShowModal(true);
    setShowCalendar(!showCalendar);
  };

  return (
    <div>
      <h1>지출 목표</h1>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}>
          <h3>현재 목표</h3>
          <p onClick={handleToggleCalendar} style={{ cursor: "pointer" }}>
            <p>
              {`${goalData.startDate.getFullYear()}-${
                goalData.startDate.getMonth() + 1
              }-${goalData.startDate.getDate()}`}
              ~
              {`${goalData.endDate.getFullYear()}-${
                goalData.endDate.getMonth() + 1
              }-${goalData.endDate.getDate()}`}
            </p>
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <h1>￦{goalAmount || "0"}</h1>
          <Link to="/aimsub">
            <p
              style={{
                backgroundColor: "#FFE4E4",
                lineHeight: 4,
                color: "#F64545",
                fontWeight: "bold",
                borderRadius: 40,
                width: 150,
                textAlign: "center",
              }}
              onClick={() => navigate("/aimsub")}>
              목표 등록하기
            </p>
          </Link>
        </div>
      </div>

      {showModal && showCalendar && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={handleCalendarClick}>
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
            }}>
            <h2>Choose Date</h2>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              showYearDropdown
              showMonthDropdown
              showYearMonthDropdown
              yearDropdownItemNumber={15}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AimMainpage;
