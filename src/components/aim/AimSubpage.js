import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { GoalAmountContext } from "../../context/GoalAmoutContext";
import { useGoalContext } from "../../context/GoalContext";
import AimSub from "../../assets/style/AimSub.module.css";

const AimSubPage = () => {
  const path = process.env.PUBLIC_URL;
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

  return (
    <div>
      <h1 className={AimSub.title}>목표 설정</h1>

      <div>
        <form className={AimSub.money}>
          <p className={AimSub.titlemoney}> 목표 금액&nbsp;&nbsp;</p>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className={AimSub.input}
          />
        </form>
        <div className={AimSub.money}>
          <p className={AimSub.titlemoney}>시작 기간</p>
          <input
            type="date"
            value={startDate.toISOString().substr(0, 10)}
            onChange={(event) => setStartDate(new Date(event.target.value))}
            className={AimSub.Calendar}
          />
        </div>
        <div className={AimSub.money}>
          <p className={AimSub.titlemoney}>종료 기간</p>
          <input
            type="date"
            value={endDate.toISOString().substr(0, 10)}
            onChange={(event) => setEndDate(new Date(event.target.value))}
            className={AimSub.Calendar}
          />
        </div>
      </div>

      <div>
        <div className={AimSub.imgContainer}>
          <figure>
            <img src={`${path}/images/good.png`} alt="good" />
            <figcaption>목표 초과까지 안전한 경우</figcaption>
          </figure>
          <figure>
            <img src={`${path}/images/bad.png`} alt="bad" />
            <figcaption>목표 초과까지 위험할 경우</figcaption>
          </figure>
        </div>
      </div>
      <Link to="/aim">
        <button onClick={handleSave} className={AimSub.join}>
          저장
        </button>
      </Link>
      <Link to="/aim">
        <button className={AimSub.cancel}>취소</button>
      </Link>
    </div>
  );
};

export default AimSubPage;
