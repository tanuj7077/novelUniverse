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
      let data =
        parseInt(diffMinutes) +
        (parseInt(diffMinutes) < 2 ? " minute" : " minutes");
      return data;
    }
    if (diffHours >= 1 && diffHours < 24) {
      let hr = parseInt(diffHours);
      let data =
        hr +
        (hr < 2 ? " hour " : " hours ") +
        parseInt((diffHours - hr) * 60) +
        (parseInt((diffHours - hr) * 60) < 2 ? " minute" : " minutes");
      return data;
    }
    if (diffDays >= 1 && diffDays < 7) {
      let days = parseInt(diffDays);
      let data =
        parseInt(diffDays) +
        (parseInt(diffDays) < 2 ? " day " : " days ") +
        parseInt((diffDays - days) * 24) +
        (parseInt((diffDays - days) * 24) < 2 ? " hour" : "hours");
      return data;
    }
    if (diffWeeks >= 1 && diffWeeks < 4.34) {
      let weeks = parseInt(diffWeeks);
      let data =
        parseInt(diffWeeks) +
        (parseInt(diffWeeks) < 2 ? " week " : " weeks ") +
        parseInt((diffWeeks - weeks) * 7) +
        (parseInt((diffWeeks - weeks) * 7) < 2 ? " day" : " days");
      return data;
    }
    if (diffMonths >= 1 && diffMonths < 12) {
      let month = parseInt(diffMonths);
      let data =
        parseInt(diffMonths) +
        (parseInt(diffMonths) < 2 ? " month " : " months ") +
        parseInt((diffMonths - month) * 30.4375) +
        (parseInt((diffMonths - month) * 30.4375) < 2 ? " day" : " days");
      return data;
    }
  };
  const calculateNotificationTime = (date) => {
    let curr = new Date();
    let notificationDate = new Date(date);
    let diffMs = curr - notificationDate;
    let diffSeconds = diffMs / 1000;
    let diffMinutes = diffSeconds / 60;
    let diffHours = diffMinutes / 60;
    let diffDays = diffHours / 24;
    let diffWeeks = diffDays / 7;
    let diffMonths = diffDays / 30.4375;
    if (diffMinutes < 2) {
      let data = parseInt(diffMinutes) + " minute";
      return data;
    }
    if (diffMinutes >= 2 && diffMinutes < 60) {
      let data = parseInt(diffMinutes) + " minutes";
      return data;
    }
    if (diffHours < 2) {
      let hr = parseInt(diffHours);
      let data = hr + " hour";
      return data;
    }
    if (diffHours >= 2 && diffHours < 24) {
      let hr = parseInt(diffHours);
      let data = hr + " hours";
      return data;
    }
    if (diffDays < 2) {
      let days = parseInt(diffDays);
      let data = days + " day";
      return data;
    }
    if (diffDays >= 2 && diffDays < 7) {
      let days = parseInt(diffDays);
      let data = days + " days ";
      return data;
    }
    if (diffWeeks < 2) {
      let weeks = parseInt(diffWeeks);
      let data = weeks + " week";
      return data;
    }
    if (diffWeeks >= 2 && diffWeeks < 4.34) {
      let weeks = parseInt(diffWeeks);
      let data = weeks + " weeks ";
      return data;
    }
    if (diffMonths < 2) {
      let month = parseInt(diffMonths);
      let data = month + " month";
      return data;
    }
    if (diffMonths >= 2 && diffMonths < 12) {
      let month = parseInt(diffMonths);
      let data = month + " months ";
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
        setNotificationVisibility,
        addToViews,
        addChapterRead,
        calculateTimeDifference,
        calculateNotificationTime,
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
