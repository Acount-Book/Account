// src/components/LoginPage.js
import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoginStyles from "../../assets/style/Login.module.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    userId: "",
    userPw: "",
  });
  const navigate = useNavigate();
  const { login } = useAuth();
  const { userId, userPw } = formData;

  const handleLogin = (e) => {
    e.preventDefault();
    // 여기에서 실제 로그인 처리 로직을 추가해야 합니다.

    const storageUserList = JSON.parse(localStorage.getItem("user"));
    // 아이디와 비밀번호를 비교
    const checkUser = storageUserList.find(
      (list) =>
        list.userId === formData.userId && list.userPw === formData.userPw
    );

    if (checkUser) {
      localStorage.setItem("user", JSON.stringify(checkUser));
      login();
      navigate("/home"); // 로그인이 되면 홈으로 이동
    } else {
      alert("아이디나 비밀번호가 틀렸습니다!");
    }

    // 사용자가 아무것도 입력하지 않은 경우 알림창을 띄움
    if (!userId || !userPw) {
      window.alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }
    // 가상의 로그인 함수를 통해 사용자 입력값 검증
    // fakeLogin(userId, userPw);
  };
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }, []);

  // 가상의 로그인 함수
  // const fakeLogin = (enteredUsername, enteredPassword) => {
  //   // 사용자가 정한 아이디와 비밀번호
  //   const userDefinedUsername = "user1";
  //   const userDefinedPassword = "pw123";

  //   // 입력된 아이디와 비밀번호와 사용자가 정한 값이 일치하는지 확인
  //   if (
  //     enteredUsername === userDefinedUsername &&
  //     enteredPassword === userDefinedPassword
  //   ) {
  //     // 로그인 성공 시
  //     window.alert("로그인 성공!");
  //     navigate("/home");
  //     login();
  //     //
  //   }
  // };

  return (
    <div className={LoginStyles.LoginContainer}>
      <h2 className={LoginStyles.my}>
        나만의
        <br />
        <span className={LoginStyles.sub}>가계부</span>
      </h2>

      <div className="signup-link">
        <p>
          <Link to="/signup" className={LoginStyles.need}>
            회원가입이 필요하신가요?
          </Link>
        </p>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username"></label>
            <input
              className={LoginStyles.input}
              type="text"
              id="username"
              name="userId"
              value={userId}
              onChange={handleChange}
              placeholder="아이디"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password"></label>
            <input
              className={LoginStyles.input}
              type="password"
              id="password"
              name="userPw"
              value={userPw}
              onChange={handleChange}
              placeholder="비밀번호"
              required
            />
          </div>

          <div className="form-group">
            <button type="submit" className={LoginStyles.inside}>
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
