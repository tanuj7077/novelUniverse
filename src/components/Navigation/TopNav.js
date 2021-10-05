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
              Home
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
              Browse
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
                Collection
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
                Profile
              </p>
            )}
          />
        )}
        {isLoggedIn && (
          <p
            className="topNav-right-item"
            onClick={toggleNotificationVisibility}
          >
            <span>Notification</span>
            {notificationVisibility && <Notification />}
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
