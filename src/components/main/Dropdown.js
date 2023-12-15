// Dropdown.js
import React, { useState, useEffect } from "react";
import mainStyle from "../../assets/style/Main.module.css";
const Dropdown = ({ setSelectedMonth }) => {
  const [selectedMonth, setSelectedMonthLocal] = useState(null);

  useEffect(() => {
    // Load the selected month from local storage when the component mounts
    const storedMonth = JSON.parse(localStorage.getItem("selectedMonth"));
    if (storedMonth !== null) {
      setSelectedMonthLocal(storedMonth);
      setSelectedMonth(storedMonth);
    }
  }, [setSelectedMonth]);

  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const handleSelect = (event) => {
    const selected = parseInt(event.target.value, 10); // Convert the value to an integer
    setSelectedMonthLocal(selected);
    setSelectedMonth(selected);
    // Save the selected month to local storage
    localStorage.setItem("selectedMonth", JSON.stringify(selected));
  };

  return (
    <div>
      <label htmlFor="months"> </label>
      <select
        id="months"
        className={mainStyle.dropdown}
        onChange={handleSelect}
        value={selectedMonth || ""}>
        <option value="" disabled>
          월을 선택하세요
        </option>
        {months.map((month, index) => (
          <option key={index} value={index + 1}>
            {month}
          </option>
        ))}
      </select>

      {/* {selectedMonth && <p>{selectedMonth}월 내역을 표시합니다.</p>} */}
    </div>
  );
};

export default Dropdown;
