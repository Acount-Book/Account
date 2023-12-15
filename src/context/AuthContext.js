// AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Retrieve the authentication state from localStorage
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const login = (token) => {
    // Store token in localStorage during login
    setIsLoggedIn(true);
    // localStorage.setItem("isLoggedIn", "true");
  };

  const logout = () => {
    // Remove token from localStorage during logout

    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
