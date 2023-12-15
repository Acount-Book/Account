import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/login/Login";
import SignupPage from "./components/login/SignupPage";
import MainAccount from "./Pages/MainAccount";
import ChartPage from "./Pages/ChartPage";
import AimMainpage from "./Pages/AimMainpage";
import AimSubPage from "./components/aim/AimSubpage";
import Lotto from "./components/lotto/Lotto";
import MainAdditem from "./components/main/MainAdditem";
import Navigation from "./components/Navigation";
import { GoalAmountContext } from "./context/GoalAmoutContext";

function App() {
  const [goalAmount, setGoalAmount] = useState("");

  return (
    <GoalAmountContext.Provider value={{ goalAmount, setGoalAmount }}>
      <div className="appBox">
        <Navigation />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<MainAccount />} />
          <Route path="/chart" element={<ChartPage />} />
          <Route path="/aim" element={<AimMainpage />} />
          <Route path="/aimsub" element={<AimSubPage />} />
          <Route path="/lotto" element={<Lotto />} />

          <Route path="/additem" element={<MainAdditem />} />
        </Routes>
      </div>
    </GoalAmountContext.Provider>
  );
}

export default App;
