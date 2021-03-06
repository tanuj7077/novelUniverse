import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Route } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { IoIosMenu } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
//import logo from "../../logo.svg";
import logo from "../../assets/logo/novelUpdatesLogo7.svg";
import Notification from "../Notification/Notification";
const TopNav = () => {
  const location = useLocation();
  const [tab, setTab] = useState();
  const {
    toggleLoginModalVisibility,
    toggleNotificationVisibility,
    notificationVisibility,
    setNotificationVisibility,
    userData,
    isLoggedIn,
    logout,
  } = useGlobalContext();
  const [menuVisibility, setMenuVisibility] = useState(false);
  useEffect(() => {
    let arr = location.pathname.split("/").map(String);
    if (arr.length > 1) {
      setTab(arr[1]);
    }
  }, [location]);
  return (
    <div className="topNav">
      <div className="topNav-left">
        <div className="topNav-logo">
          <img src={logo} alt="" className="topNav-logo-icon" />
          <p className="topNav-logo-text"></p>
        </div>
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
        {isLoggedIn &&
          userData &&
          userData.username === process.env.REACT_APP_ADMIN_USERNAME && (
            <Route
              render={({ history }) => (
                <p
                  className={`topNav-right-item ${
                    tab === "add" ? "active" : ""
                  }`}
                  onClick={() => {
                    history.push(`/add`);
                  }}
                >
                  <span className="text">Add</span>
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
                  history.push(`/profile/${userData.username}`);
                }}
              >
                <span className="text">Profile</span>
              </p>
            )}
          />
        )}
        {isLoggedIn && (
          <div className={`topNav-right-item`}>
            <span className="text" onClick={toggleNotificationVisibility}>
              Notification
            </span>
            <Notification />
            {/* {notificationVisibility && <Notification />} */}
          </div>
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
        {isLoggedIn && (
          <div className="topNav-right-item topNav-right-iconItem">
            <div
              id="notificationIcon"
              onClick={() => {
                !notificationVisibility
                  ? setNotificationVisibility(true)
                  : setNotificationVisibility(false);
              }}
            >
              <IoNotifications className="topNav-right-iconItem-notification" />
              <Notification />
            </div>
          </div>
        )}
        <p className="topNav-right-iconItem">
          <IoIosMenu
            className="topNav-right-iconItem-menu"
            onClick={() => setMenuVisibility(!menuVisibility)}
          />
        </p>
      </div>

      <ul
        className={`topNav-menu-list ${
          menuVisibility
            ? "topNav-menu-list-visible"
            : "topNav-menu-list-invisible"
        }`}
      >
        <Route
          render={({ history }) => (
            <li
              className={`topNav-menu-list-item  ${
                tab === "home" ? "active" : ""
              }`}
              onClick={() => {
                history.push(`/home`);
                setMenuVisibility(false);
              }}
            >
              <p className="text">Home</p>
            </li>
          )}
        />
        <Route
          render={({ history }) => (
            <li
              className={`topNav-menu-list-item  ${
                tab === "browse" ? "active" : ""
              }`}
              onClick={() => {
                history.push(`/browse`);
                setMenuVisibility(false);
              }}
            >
              <p className="text">Browse</p>
            </li>
          )}
        />
        {isLoggedIn && (
          <Route
            render={({ history }) => (
              <li
                className={`topNav-menu-list-item  ${
                  tab === "collection" ? "active" : ""
                }`}
                onClick={() => {
                  history.push(`/collection`);
                  setMenuVisibility(false);
                }}
              >
                <p className="text">Collection</p>
              </li>
            )}
          />
        )}
        {isLoggedIn && (
          <Route
            render={({ history }) => (
              <li
                className={`topNav-menu-list-item  ${
                  tab === "profile" ? "active" : ""
                }`}
                onClick={() => {
                  history.push(`/profile/${userData.username}`);
                  setMenuVisibility(false);
                }}
              >
                <p className="text">Profile</p>
              </li>
            )}
          />
        )}
        {isLoggedIn &&
          userData &&
          userData.username === process.env.REACT_APP_ADMIN_USERNAME && (
            <Route
              render={({ history }) => (
                <li
                  className={`topNav-menu-list-item  ${
                    tab === "add" ? "active" : ""
                  }`}
                  onClick={() => {
                    history.push(`/add`);
                    setMenuVisibility(false);
                  }}
                >
                  <p className="text">Add</p>
                </li>
              )}
            />
          )}

        {isLoggedIn ? (
          <li
            className={`topNav-menu-list-item`}
            onClick={() => {
              logout();
              setMenuVisibility(false);
            }}
          >
            <p className="text">Logout</p>
          </li>
        ) : (
          <li
            className={`topNav-menu-list-item`}
            onClick={() => {
              toggleLoginModalVisibility();
              setMenuVisibility(false);
            }}
          >
            <p className="text">Login</p>
          </li>
        )}
      </ul>
    </div>
  );
};
export default TopNav;
