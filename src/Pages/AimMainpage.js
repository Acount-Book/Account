import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { GoalAmountContext } from "../context/GoalAmoutContext";
import { useGoalContext } from "../context/GoalContext";
import AimMain from "../assets/style/AimMain.module.css";

const AimMainpage = () => {
  const path = process.env.PUBLIC_URL;
  const [istoggle, setIstoggle] = useState();
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

  const handleButtonClick = () => {
    setIstoggle(!istoggle);
    navigate("/aimsub");
    // Navigate to the "/mainadditem" route
  };

  return (
    <div>
      <h1 className={AimMain.Aim}>지출 목표</h1>
      <div className={AimMain.titleContainer}>
        <div className={AimMain.status}>
          <h3>현재 목표</h3>
          <p onClick={handleToggleCalendar} className={AimMain.date}>
            <p>
              {`${goalData.startDate.getFullYear()}.  ${
                goalData.startDate.getMonth() + 1
              }.  ${goalData.startDate.getDate()}`}
              &nbsp; - &nbsp;
              {`${goalData.endDate.getFullYear()}  .${
                goalData.endDate.getMonth() + 1
              }  .${goalData.endDate.getDate()}`}
            </p>
          </p>
        </div>
        <div className={AimMain.money}>
          <h1>￦{goalAmount || "0"}</h1>
          <Link to="/aimsub" className={AimMain.button}>
            <p className={AimMain.set} onClick={() => navigate("/aimsub")}>
              목표 등록하기
            </p>
          </Link>
        </div>
      </div>
      <div className={AimMain.containerWrapper}>
        <h3>소비량</h3>
        <img src={`${path}/images/pngwing.svg`} alt="" />
      </div>
      {showModal && showCalendar && (
        <div onClick={handleCalendarClick}>
          <div>
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
      <button onClick={handleButtonClick} className={AimMain.addBtn}></button>
    </div>
  );
};

export default AimMainpage;
