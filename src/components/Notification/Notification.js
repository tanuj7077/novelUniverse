import React from "react";
import { useGlobalContext } from "../../context";

function Notification() {
  const { toggleNotificationVisibility, notificationVisibility } =
    useGlobalContext();
  return (
    <section
      className={`notification ${
        notificationVisibility ? "notification-visible" : ""
      }`}
    >
      {/* <div className="notification-empty">You don't have any notification</div> */}
      <div className="notification-items">
        <div className="notification-items-item">
          <p className="notification-items-item-head">
            <span className="notification-items-item-type">Chapter Update</span>
            <span className="notification-items-item-date">9:26 am</span>
          </p>
          <p className="notification-items-item-body">
            <span className="notification-items-item-content">
              New chapter released for <em>"The Beginning after the End"</em>
            </span>
          </p>
        </div>
        <div className="notification-items-item">
          <p className="notification-items-item-head">
            <span className="notification-items-item-type">Reply</span>
            <span className="notification-items-item-date">12/02/22</span>
          </p>
          <p className="notification-items-item-body">
            <span className="notification-items-item-content">
              You have got new replies on your comment in <em>"Chapter 21"</em>{" "}
              of <em>"Martial World"</em>
            </span>
          </p>
        </div>
        <div className="notification-items-item">
          <p className="notification-items-item-head">
            <span className="notification-items-item-type">Follow Update</span>
            <span className="notification-items-item-date">12/02/22</span>
          </p>
          <p className="notification-items-item-body">
            <span className="notification-items-item-content">
              User <em>"Tanuj07"</em> has recommended <em>"The Boxer"</em>
            </span>
          </p>
        </div>
        <div className="notification-items-item">
          <p className="notification-items-item-head">
            <span className="notification-items-item-type">Chapter Update</span>
            <span className="notification-items-item-date">9:26 am</span>
          </p>
          <p className="notification-items-item-body">
            <span className="notification-items-item-content">
              New chapter released for <em>"The Beginning after the End"</em>
            </span>
          </p>
        </div>
        <div className="notification-items-item">
          <p className="notification-items-item-head">
            <span className="notification-items-item-type">Reply</span>
            <span className="notification-items-item-date">12/02/22</span>
          </p>
          <p className="notification-items-item-body">
            <span className="notification-items-item-content">
              You have got new replies on your comment in <em>"Chapter 21"</em>
              of <em>"Martial World"</em>
            </span>
          </p>
        </div>
        <div className="notification-items-item">
          <p className="notification-items-item-head">
            <span className="notification-items-item-type">Follow Update</span>
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
    </section>
  );
}

export default Notification;
