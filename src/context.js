import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  const toggleLoginModalVisibility = () => {
    setLoginModalVisible(!loginModalVisible);
  };
  return (
    <AppContext.Provider
      value={{
        loginModalVisible,
        toggleLoginModalVisibility,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
