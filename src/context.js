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
  const getUpdatedUserData = async () => {
    await axios
      .get(`http://localhost:8000/user/getUpdatedUserData/${userData._id}`)
      .then((res) => {
        setUserData(res.data.userData);
      });
  };
  const addToViews = (bookId) => {
    axios.post(`http://localhost:8000/book/addViews/${bookId}`).then((res) => {
      console.log("added to views");
    });
  };
  const addChapterRead = (bookId, chapterId, userId) => {
    console.log("chapter read executed");
    axios
      .post(`http://localhost:8000/book/addChaptersRead`, {
        bookId,
        chapterId,
        userId,
      })
      .then((res) => {
        console.log("added chapter");
        getUpdatedUserData();
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
  const calculateTimeDifference = (date) => {
    let curr = new Date();
    let novelUpdateDate = new Date(date);
    let diffMs = curr - novelUpdateDate;
    let diffSeconds = diffMs / 1000;
    let diffMinutes = diffSeconds / 60;
    let diffHours = diffMinutes / 60;
    let diffDays = diffHours / 24;
    let diffWeeks = diffDays / 7;
    let diffMonths = diffDays / 30.4375;
    if (diffMinutes >= 0 && diffMinutes < 60) {
      let data = parseInt(diffMinutes) + "minutes";
      return data;
    }
    if (diffHours >= 1 && diffHours < 24) {
      let hr = parseInt(diffHours);
      let data = hr + " hours " + parseInt((diffHours - hr) * 60) + " minutes";
      return data;
    }
    if (diffDays >= 1 && diffDays < 7) {
      let days = parseInt(diffDays);
      let data =
        parseInt(diffDays) +
        " days " +
        parseInt((diffDays - days) * 24) +
        " hours";
      return data;
    }
    if (diffWeeks >= 1 && diffWeeks < 4.34) {
      let weeks = parseInt(diffWeeks);
      let data =
        parseInt(diffWeeks) +
        " weeks " +
        parseInt((diffWeeks - weeks) * 7) +
        " days";
      return data;
    }
    if (diffMonths >= 1 && diffMonths < 12) {
      let month = parseInt(diffMonths);
      let data =
        parseInt(diffMonths) +
        " months " +
        parseInt((diffMonths - month) * 30.4375) +
        " days";
      return data;
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
        addToViews,
        addChapterRead,
        calculateTimeDifference,
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
