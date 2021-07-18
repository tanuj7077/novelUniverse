import React, { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { MdCollectionsBookmark } from "react-icons/md"; //collection
import { CgProfile } from "react-icons/cg";
import { SiGmail } from "react-icons/si";
import { IoMdLogIn } from "react-icons/io";
import { Route } from "react-router-dom";
const SideNav = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`sideNav ${expanded ? "expanded" : ""}`}>
      <FiMenu
        className="sideNav-hamburger"
        onClick={() => setExpanded(!expanded)}
      />
      <Route
        render={({ history }) => (
          <span
            className="sideNav-menuItem"
            onClick={() => {
              history.push(`/home`);
            }}
          >
            <AiFillHome
              className={`sideNav-menuItem-icon ${expanded ? "hideIcon" : ""}`}
            />
            <span
              className={`sideNav-menuItem-text ${expanded ? "" : "hideText"}`}
            >
              Home
            </span>
          </span>
        )}
      />
      <Route
        render={({ history }) => (
          <span
            className="sideNav-menuItem"
            onClick={() => {
              history.push(`/browse`);
            }}
          >
            <AiOutlineSearch
              className={`sideNav-menuItem-icon ${expanded ? "hideIcon" : ""}`}
            />
            <span
              className={`sideNav-menuItem-text ${expanded ? "" : "hideText"}`}
            >
              Browse
            </span>
          </span>
        )}
      />
      <Route
        render={({ history }) => (
          <span
            className="sideNav-menuItem"
            onClick={() => {
              history.push(`/collection`);
            }}
          >
            <MdCollectionsBookmark
              className={`sideNav-menuItem-icon ${expanded ? "hideIcon" : ""}`}
            />
            <span
              className={`sideNav-menuItem-text ${expanded ? "" : "hideText"}`}
            >
              Collection
            </span>
          </span>
        )}
      />
      <Route
        render={({ history }) => (
          <span
            className="sideNav-menuItem"
            onClick={() => {
              history.push(`/profile`);
            }}
          >
            <CgProfile
              className={`sideNav-menuItem-icon ${expanded ? "hideIcon" : ""}`}
            />
            <span
              className={`sideNav-menuItem-text ${expanded ? "" : "hideText"}`}
            >
              Profile
            </span>
          </span>
        )}
      />
      <Route
        render={({ history }) => (
          <span
            className="sideNav-menuItem"
            onClick={() => {
              history.push(`/contact`);
            }}
          >
            <SiGmail
              className={`sideNav-menuItem-icon ${expanded ? "hideIcon" : ""}`}
            />
            <span
              className={`sideNav-menuItem-text ${expanded ? "" : "hideText"}`}
            >
              Contact
            </span>
          </span>
        )}
      />

      <span className="sideNav-menuItem">
        <IoMdLogIn
          className={`sideNav-menuItem-icon ${expanded ? "hideIcon" : ""}`}
        />
        <span className={`sideNav-menuItem-text ${expanded ? "" : "hideText"}`}>
          Login
        </span>
      </span>
      <span className="sideNav-current"></span>
    </div>
  );
};
export default SideNav;
