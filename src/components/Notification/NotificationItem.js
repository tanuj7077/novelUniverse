import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import { Route, useHistory } from "react-router-dom";

function NotificationItem({ notification }) {
  let { getUpdatedUserData } = useGlobalContext();
  const [timeDiff, setTimeDiff] = useState();
  const history = useHistory();
  const calculateTimeDifference = () => {};
  const deleteNotification = async () => {};
  const goToPage = () => {
    if (notification.notificationType === "chapterUpdate") {
      history.push(`/chapter/${notification.msg.chapter}`);
    } else if (notification.notificationType === "reply") {
      history.push(`/chapter/${notification.msg.chapter}`);
    } else if (notification.notificationType === "followRecommend") {
      history.push(`/book/${notification.msg.book}`);
    }
  };

  return (
    <>
      {notification.notificationType === "chapterUpdate" && (
        <div className="notification-items-item" onClick={goToPage}>
          <p className="notification-items-item-head">
            <span className="notification-items-item-type">Chapter Update</span>
            <span className="notification-items-item-date">9:26 am</span>
          </p>
          <p className="notification-items-item-body">
            <span className="notification-items-item-content">
              New chapter released for <em>"{notification.msg.bookName}"</em>
            </span>
          </p>
        </div>
      )}
      {notification.notificationType === "reply" && (
        <div className="notification-items-item" onClick={goToPage}>
          <p className="notification-items-item-head">
            <span className="notification-items-item-type">Reply</span>
            <span className="notification-items-item-date">9:26 am</span>
          </p>
          <p className="notification-items-item-body">
            <span className="notification-items-item-content">
              You have got new replies on your comment in{" "}
              <em>"{"Chapter " + notification.msg.chapterNumber}"</em> of{" "}
              <em>"{notification.msg.bookName}"</em>
            </span>
          </p>
        </div>
      )}
      {notification.notificationType === "followRecommend" && (
        <div className="notification-items-item" onClick={goToPage}>
          <p className="notification-items-item-head">
            <span className="notification-items-item-type">Follow Update</span>
            <span className="notification-items-item-date">9:26 am</span>
          </p>
          <p className="notification-items-item-body">
            <span className="notification-items-item-content">
              User <em>"{notification.msg.userName}"</em> has recommended{" "}
              <em>"{notification.msg.bookName}"</em>
            </span>
          </p>
        </div>
      )}
    </>
  );
}

export default NotificationItem;
