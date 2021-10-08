import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState();
  const [notifications, setNotifications] = useState([]);
  const [notificationVisibility, setNotificationVisibility] = useState(false);

  const [alert, setAlert] = useState({});
  const [showAlert, setShowAlert] = useState(0);

  const toggleLoginModalVisibility = () => {
    setLoginModalVisible(!loginModalVisible);
  };
  const toggleNotificationVisibility = () => {
    setNotificationVisibility(!notificationVisibility);
  };

  const changeAlert = (msg) => {
    setAlert(msg);
    setShowAlert(1);
  };
  const getUpdatedUserData = () => {
    axios
      .get(`http://localhost:8000/user/getUpdatedUserData/${userData._id}`)
      .then((res) => {
        setUserData(res.data);
      });
  };

  const login = (loginUsername, loginPassword) => {
    const data = {
      username: loginUsername,
      password: loginPassword,
    };
    axios.post("http://localhost:8000/auth/signin", data).then((res) => {
      changeAlert(res.data.msg);
      setUserData(res.data.userData);
      setIsLoggedIn(true);
      setLoginModalVisible(false);
    });
  };
  const signup = (registerUsername, registerPassword) => {
    const data = {
      username: registerUsername,
      password: registerPassword,
    };
    axios.post("http://localhost:8000/auth/signup", data).then((res) => {
      console.log(res.data);
    });
  };
  const logout = async () => {
    try {
      await axios.get("http://localhost:8000/auth/signout").then((res) => {
        if (res.data.success) {
          changeAlert(res.data.msg);
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
        toggleNotificationVisibility,
        userData,
        setUserData,
        isLoggedIn,
        setIsLoggedIn,
        login,
        signup,
        logout,
        getUpdatedUserData,
        alert,
        setAlert,
        showAlert,
        setShowAlert,
        changeAlert,
        notificationVisibility,
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
