import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Route } from "react-router-dom";
import { useGlobalContext } from "../../context";
import Notification from "../Notification/Notification";
const TopNav = () => {
  const location = useLocation();
  const [tab, setTab] = useState();
  const {
    toggleLoginModalVisibility,
    toggleNotificationVisibility,
    notificationVisibility,
    isLoggedIn,
    logout,
  } = useGlobalContext();
  useEffect(() => {
    let arr = location.pathname.split("/").map(String);
    if (arr.length > 1) {
      setTab(arr[1]);
    }
  }, [location]);
  return (
    <div className="topNav">
      <div className="topNav-left">
        <div className="topNav-logo">Ultimate Biblio</div>
      </div>

      <div className="topNav-right">
        <Route
          render={({ history }) => (
            <p
              className={`topNav-right-item ${tab === "home" ? "active" : ""}`}
              onClick={() => {
                history.push(`/home`);
              }}
            >
              <span className="text">Home</span>
            </p>
          )}
        />
        <Route
          render={({ history }) => (
            <p
              className={`topNav-right-item ${
                tab === "browse" ? "active" : ""
              }`}
              onClick={() => {
                history.push(`/browse`);
              }}
            >
              <span className="text">Browse</span>
            </p>
          )}
        />
        {isLoggedIn && (
          <Route
            render={({ history }) => (
              <p
                className={`topNav-right-item ${
                  tab === "collection" ? "active" : ""
                }`}
                onClick={() => {
                  history.push(`/collection`);
                }}
              >
                <span className="text">Collection</span>
              </p>
            )}
          />
        )}
        {isLoggedIn && (
          <Route
            render={({ history }) => (
              <p
                className={`topNav-right-item ${
                  tab === "profile" ? "active" : ""
                }`}
                onClick={() => {
                  history.push(`/profile`);
                }}
              >
                <span className="text">Profile</span>
              </p>
            )}
          />
        )}
        {isLoggedIn && (
          <p className="topNav-right-item">
            <span className="text" onClick={toggleNotificationVisibility}>
              Notification
            </span>
            <Notification />
            {/* {notificationVisibility && <Notification />} */}
          </p>
        )}
        {isLoggedIn ? (
          <p className="topNav-right-login-item" onClick={logout}>
            Logout
          </p>
        ) : (
          <p
            className="topNav-right-login-item"
            onClick={toggleLoginModalVisibility}
          >
            Login
          </p>
        )}
      </div>
    </div>
    // {<div className="topNav">
    //   <div className="topNav-logo">Ultimate Biblio</div>
    //   <div className="topNav-login">Login</div>
    // </div>}
  );
};
export default TopNav;
