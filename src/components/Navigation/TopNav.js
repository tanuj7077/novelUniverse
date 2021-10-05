import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Route } from "react-router-dom";
import { useGlobalContext } from "../../context";
const TopNav = () => {
  const location = useLocation();
  const [tab, setTab] = useState();
  const { toggleLoginModalVisibility, isLoggedIn, logout } = useGlobalContext();
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
            <span
              className={`topNav-right-item ${tab === "home" ? "active" : ""}`}
              onClick={() => {
                history.push(`/home`);
              }}
            >
              Home
            </span>
          )}
        />
        <Route
          render={({ history }) => (
            <span
              className={`topNav-right-item ${
                tab === "browse" ? "active" : ""
              }`}
              onClick={() => {
                history.push(`/browse`);
              }}
            >
              Browse
            </span>
          )}
        />
        {isLoggedIn && (
          <Route
            render={({ history }) => (
              <span
                className={`topNav-right-item ${
                  tab === "collection" ? "active" : ""
                }`}
                onClick={() => {
                  history.push(`/collection`);
                }}
              >
                Collection
              </span>
            )}
          />
        )}
        {isLoggedIn && (
          <Route
            render={({ history }) => (
              <span
                className={`topNav-right-item ${
                  tab === "profile" ? "active" : ""
                }`}
                onClick={() => {
                  history.push(`/profile`);
                }}
              >
                Profile
              </span>
            )}
          />
        )}
        {isLoggedIn && (
          <Route
            render={({ history }) => (
              <span
                className={`topNav-right-item ${
                  tab === "contact" ? "active" : ""
                }`}
                onClick={() => {
                  history.push(`/contact`);
                }}
              >
                Notification
              </span>
            )}
          />
        )}
        {isLoggedIn ? (
          <span className="topNav-right-login-item" onClick={logout}>
            Logout
          </span>
        ) : (
          <span
            className="topNav-right-login-item"
            onClick={toggleLoginModalVisibility}
          >
            Login
          </span>
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
