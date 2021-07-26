import React, { useState, useEffect } from "react";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { MdCollectionsBookmark } from "react-icons/md"; //collection
import { CgProfile } from "react-icons/cg";
import { SiGmail } from "react-icons/si";
import { IoMdLogIn } from "react-icons/io";
import { Route } from "react-router-dom";
const TopNav = () => {
  return (
    <div className="topNav">
      <div className="topNav-left">
        <div className="topNav-logo">Ultimate Biblio</div>
        {/* <div className="topNav-menuItems"> */}
        <Route
          render={({ history }) => (
            <span
              className="item"
              onClick={() => {
                history.push(`/home`);
              }}
            >
              {" "}
              Home
            </span>
          )}
        />
        <Route
          render={({ history }) => (
            <span
              className="item"
              onClick={() => {
                history.push(`/browse`);
              }}
            >
              {" "}
              Browse
            </span>
          )}
        />
        <Route
          render={({ history }) => (
            <span
              className="item"
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
              className="item"
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
              className="item"
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
