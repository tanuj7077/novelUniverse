import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState();

  const toggleLoginModalVisibility = () => {
    setLoginModalVisible(!loginModalVisible);
  };
  const logout = async () => {
    try {
      await axios.get("http://localhost:8000/auth/signout").then((res) => {
        console.log(res.data);
        if (res.data.success) {
          setUserData({});
          setIsLoggedIn(false);
          //changeAlert(res.data.message);
          //return <Redirect to="/" exact />;
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AppContext.Provider
      value={{
        loginModalVisible,
        toggleLoginModalVisibility,
        userData,
        setUserData,
        isLoggedIn,
        setIsLoggedIn,
        logout,
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
