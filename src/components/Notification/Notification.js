import React, { useRef, useEffect } from "react";
import { useGlobalContext } from "../../context";
import NotificationItem from "./NotificationItem";

function Notification() {
  const { userData, notificationVisibility, setNotificationVisibility } =
    useGlobalContext();
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
            {/* {userData.notifications.reverse().map((notification) => {
              return (
                <div className="notification-items-item">
                  <p className="notification-items-item-head">
                    {notification.notificationType === "chapterUpdate" && (
                      <span className="notification-items-item-type">
                        Chapter Update
                      </span>
                    )}
                    {notification.notificationType === "reply" && (
                      <span className="notification-items-item-type">
                        Reply
                      </span>
                    )}
                    <span className="notification-items-item-date">
                      9:26 am
                    </span>
                  </p>
                  <p className="notification-items-item-body">
                    {notification.notificationType === "chapterUpdate" && (
                      <span className="notification-items-item-content">
                        New chapter released for{" "}
                        <em>"{notification.msg.bookName}"</em>
                      </span>
                    )}
                    {notification.notificationType === "reply" && (
                      <span className="notification-items-item-content">
                        You have got new replies on your comment in{" "}
                        <em>"{"Chapter " + notification.msg.chapterNumber}"</em>{" "}
                        of <em>"{notification.msg.bookName}"</em>
                      </span>
                    )}
                  </p>
                </div>
              );
            })} */}
            <div className="notification-items-item">
              <p className="notification-items-item-head">
                <span className="notification-items-item-type">
                  Follow Update
                </span>
                <span className="notification-items-item-date">12/02/22</span>
              </p>
              <p className="notification-items-item-body">
                <span className="notification-items-item-content">
                  User <em>"Tanuj07"</em> has recommended <em>"The Boxer"</em>
                </span>
              </p>
            </div>
          </div>
          <div className="notification-read">Mark all as Read</div>
        </>
      )}
    </section>
  );
}

export default Notification;
