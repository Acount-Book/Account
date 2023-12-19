import React from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Lotto from "./lotto/Lotto";
import MainAccount from "../Pages/MainAccount";
import MainAdditem from "./main/MainAdditem";
import AimMainPage from "../Pages/AimMainpage";
import "../assets/style/style.css";
import ChartPage from "../Pages/ChartPage";
import AimSubPage from "./aim/AimSubpage";

const Navigation = () => {
  const path = process.env.PUBLIC_URL;
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // Redirect to the login page or any other desired page after logout
    navigate("/");
  };

  if (!isLoggedIn) {
    // 사용자가 로그인되어 있지 않으면 네비게이션을 표시하지 않습니다.
    return null;
  }

  return (
    <div>
      <div className="globalNav">
        <ul>
          <li>
            <Link to="/home">가계부</Link>
          </li>
          <li>
            <Link to="/chart">통계</Link>
          </li>
          <li>
            <Link to="/aim">목표</Link>
          </li>
          <li>
            <Link to="/lotto">로또</Link>
          </li>
        </ul>
      </div>

      <button onClick={handleLogout} className="logoutBtn">
        <img
          src={`${path}/images/logout_FILL0_wght400_GRAD0_opsz24.svg`}
          alt="log"
        />
      </button>
    </div>
  );
};

export default Navigation;
// In this example, I added a `<button>` element with an `onClick` handler that calls the `handleLogout` function, which in turn calls the `logout` function from the `useAuth` hook. After logging out, the user is redirected to the login page using the `navigate("/")` function. Adjust the redirection path according to your application's routing setup.
