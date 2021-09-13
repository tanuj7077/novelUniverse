import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Route } from "react-router-dom";
const TopNav = () => {
  const windowUrl = window.location.pathname;
  const location = useLocation();
  const [tab, setTab] = useState();
  console.log(location);
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
        {/* <div className="topNav-menuItems"> */}
        <Route
          render={({ history }) => (
            <span
              className={`item ${tab === "home" ? "active" : ""}`}
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
              className={`item ${tab === "browse" ? "active" : ""}`}
              onClick={() => {
                history.push(`/browse`);
              }}
            >
              Browse
            </span>
          )}
        />
        <Route
          render={({ history }) => (
            <span
              className={`item ${tab === "collection" ? "active" : ""}`}
              onClick={() => {
                history.push(`/collection`);
              }}
            >
              Collection
            </span>
          )}
        />
        <Route
          render={({ history }) => (
            <span
              className={`item ${tab === "profile" ? "active" : ""}`}
              onClick={() => {
                history.push(`/profile`);
              }}
            >
              Profile
            </span>
          )}
        />
        <Route
          render={({ history }) => (
            <span
              className={`item ${tab === "contact" ? "active" : ""}`}
              onClick={() => {
                history.push(`/contact`);
              }}
            >
              Contact
            </span>
          )}
        />
        {/* </div> */}
      </div>
      <div className="topNav-right">Login</div>
    </div>
    // {<div className="topNav">
    //   <div className="topNav-logo">Ultimate Biblio</div>
    //   <div className="topNav-login">Login</div>
    // </div>}
  );
};
export default TopNav;
