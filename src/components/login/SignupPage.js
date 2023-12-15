// src/components/SignupPage.js
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignStyles from "../../assets/style/SignupPage.module.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const storageUserList = JSON.parse(localStorage.getItem("user")) || [];
  // 사용자 리스트
  const no = useRef(storageUserList.length + 1);
  const [user, setUser] = useState(storageUserList);
  const [formData, setFormData] = useState({
    userId: "",
    userPw: "",
  });
  const { userId, userPw } = formData;

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }, []);
  const handleSignup = (e) => {
    e.preventDefault();
    if (!userId || !userPw) {
      window.alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }
    // 아이디 확인
    const isChkId = storageUserList.find((user) => user.userId === userId);
    if (isChkId) {
      alert("이미 가입된 아이디 입니다!");
      return;
    }

    // 사용자 입력
    const newUser = {
      id: no.current++,
      userId,
      userPw,
    };

    // Update storageUserList with the new user
    const updatedUserList = [...storageUserList, newUser];

    // Update local storage
    localStorage.setItem("user", JSON.stringify(updatedUserList));

    // Update state
    setUser(updatedUserList);

    // 폼 초기화
    setFormData({
      userId: "",
      userPw: "",
    });

    alert("회원가입 성공");
    navigate("/");
  };

  const handleCancel = () => {
    // Navigate to the login page when cancel button is clicked
    navigate("/");
  };

  return (
    <div className="signup-container">
      <h2 className={SignStyles.sign}>회원가입</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        <div className="form-group">
          <label htmlFor="new-username"></label>
          <input
            className={SignStyles.input}
            type="text"
            id="new-username"
            name="userId"
            value={userId}
            placeholder="아이디"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="new-password"></label>
          <input
            className={SignStyles.input}
            type="password"
            id="new-password"
            name="userPw"
            value={userPw}
            placeholder="비밀번호"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button type="submit" className={SignStyles.join}>
            확인
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className={SignStyles.cancel}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
