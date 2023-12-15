// GoalContext.js
import { createContext, useContext, useState } from "react";

const GoalContext = createContext();

export const GoalProvider = ({ children }) => {
  const [goalData, setGoalData] = useState({
    startDate: new Date(),
    endDate: new Date(),
    goalAmount: "",
  });

  const updateGoalData = (newData) => {
    setGoalData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <GoalContext.Provider value={{ goalData, updateGoalData }}>
      {children}
    </GoalContext.Provider>
  );
};

export const useGoalContext = () => useContext(GoalContext);
