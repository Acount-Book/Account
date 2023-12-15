import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { GoalAmountContext } from "../../context/GoalAmoutContext";
import { useGoalContext } from "../../context/GoalContext";

const AimSubPage = () => {
  const { setGoalAmount } = useContext(GoalAmountContext);
  const { updateGoalData } = useGoalContext();
  const [amount, setAmount] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSave = () => {
    setGoalAmount(amount);
    updateGoalData({
      startDate: startDate,
      endDate: endDate,
      goalAmount: amount,
    });
  };

  const generateDateRange = () => {
    const startMonth = startDate.toLocaleString("default", { month: "long" });
    const startDay = startDate.getDate();
    const endMonth = endDate.toLocaleString("default", { month: "long" });
    const endDay = endDate.getDate();

    return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
  };

  return (
    <div>
      <h1>목표 설정</h1>

      <div>
        <form>
          목표 금액&nbsp;&nbsp;
          <input type="number" value={amount} onChange={handleAmountChange} />
        </form>
        <div>
          <p>시작 기간</p>
          <input
            type="date"
            value={startDate.toISOString().substr(0, 10)}
            onChange={(event) => setStartDate(new Date(event.target.value))}
          />
        </div>
        <div>
          <p>종료 기간</p>
          <input
            type="date"
            value={endDate.toISOString().substr(0, 10)}
            onChange={(event) => setEndDate(new Date(event.target.value))}
          />
        </div>
      </div>

      <div>
        <div>
          <h3>이미지</h3>
          <h3>이미지</h3>
        </div>
      </div>
      <Link to="/aim">
        <button onClick={handleSave}>저장</button>
      </Link>
      <Link to="/aim">
        <button>취소</button>
      </Link>
    </div>
  );
};

export default AimSubPage;