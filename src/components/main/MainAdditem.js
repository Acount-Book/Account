import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useExpenseContext } from "../../context/ExpenseContext";

const MainAdditem = () => {
  const { istoggle, setIstoggle, handleAddExpense } = useExpenseContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState([
    "식비",
    "카페/음료",
    "교통",
    "생활",
    "통신",
    "선물",
    "오락",
    "패션",
    "문화",
    "의료",
    "교통비",
    "기타",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isChk, setIsChk] = useState(false);
  const [money, setMoney] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Close the calendar modal when a date is selected
    setShowModal(false);
    setShowCalendar(false);
  };

  const toggleCalendar = () => {
    setShowModal(true);
    setShowCalendar(!showCalendar);
  };

  const handleSave = () => {
    // Check if the required fields are filled before saving
    if (!selectedDate || !money || !selectedCategory) {
      alert("모든 필수 항목을 입력하세요!");
      return;
    }

    const newExpense = {
      date: selectedDate,
      category: selectedCategory,
      amount: money,
    };
    handleAddExpense(newExpense);
    setSelectedDate(null);
    setSelectedCategory("");
    setMoney("");
    setIsChk(false);

    navigate("/home");
  };
  // 사용자가 입력한 지출 정보를 상위 컴포넌트로 전달

  // 입력 후 상태 초기화 또는 필요한 로직 수행

  // Get the handleAddExpense function from the parent component

  // Use the function

  const handleCancel = () => {
    setSelectedDate(null);
    setSelectedCategory("");
    setMoney("");
    setIsChk(false);

    navigate("/home");
  };

  return (
    <div>
      <h2>내역추가</h2>
      <div>
        <button onClick={toggleCalendar}>날짜</button>
        <span>{selectedDate ? selectedDate.toLocaleDateString() : ""}</span>
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
          }}>
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
            }}>
            <h2>날짜 선택</h2>
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

      <input
        type="number"
        value={money}
        onChange={(e) => setMoney(e.target.value)}
      />
      <div>
        <label>카테고리: {selectedCategory}</label>
      </div>
      <div className="category-menu">
        <ul>
          {categories.map((category) => (
            <li key={category} onClick={() => setSelectedCategory(category)}>
              {category}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={handleSave}>저장</button>
      <button onClick={handleCancel}>취소</button>
    </div>
  );
};

export default MainAdditem;
