import React, { useRef, useEffect } from "react";
import { useGlobalContext } from "../../context";
import NotificationItem from "./NotificationItem";
import axios from "axios";

function Notification() {
  const {
    userData,
    notificationVisibility,
    setNotificationVisibility,
    getUpdatedUserData,
  } = useGlobalContext();
  //-----------------Disable Search on outside Click-----------------
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          //!event.target.className === "text"
          event.target.innerHTML.toLowerCase() !== "notification" &&
            setNotificationVisibility(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const clearNotifications = async () => {
    let data = {
      userId: userData._id,
    };
    await axios
      .post("http://localhost:8000/user/deleteAllNotifications", data)
      .then((res) => {
        console.log(res.data);
        getUpdatedUserData();
      });
  };
  return (
    <section
      className={`notification ${
        notificationVisibility ? "notification-visible" : ""
      }`}
      ref={wrapperRef}
    >
      {userData &&
      userData.notifications &&
      userData.notifications.length === 0 ? (
        <div className="notification-empty">
          You don't have any notification
        </div>
      ) : (
        <>
          <div className="notification-items">
            {userData &&
              userData.notifications &&
              userData.notifications.reverse().map((notification) => {
                return <NotificationItem notification={notification} />;
              })}
          </div>
          <div className="notification-read" onClick={clearNotifications}>
            Mark all as Read
          </div>
        </>
      )}
    </section>
  );
}

export default Notification;
