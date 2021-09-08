import React, { useState, useEffect, useRef } from "react";
import { browseNovels } from "../../mockData";
import { FaStar } from "react-icons/fa";
import { Route } from "react-router-dom";
import useOnScreen from "../../components/Utilities/useOnScreen";
const Collection = () => {
  const bookmarkedRef = useRef();
  const bookmarkedIsVisible = useOnScreen(bookmarkedRef);
  const ongoingRef = useRef();
  const ongoingIsVisible = useOnScreen(ongoingRef);
  const completedRef = useRef();
  const completedIsVisible = useOnScreen(completedRef);
  const moveToBookmarked = () => {
    document.getElementById("bookmarked").scrollIntoView(true);
  };
  const moveToOngoing = () => {
    document.getElementById("ongoing").scrollIntoView(true);
  };
  const moveToCompleted = () => {
    document.getElementById("completed").scrollIntoView(true);
  };
  return (
    <div className="collectionPage">
      <div className="collectionPage-leftPane">
        <div
          className={`item ${bookmarkedIsVisible ? "current" : ""}`}
          onClick={moveToBookmarked}
        >
          <p id="bookmarkedText">Bookmarked</p>
        </div>
        <div
          className={`item ${ongoingIsVisible ? "current" : ""}`}
          onClick={moveToOngoing}
        >
          <p id="ongoingText">Ongoing</p>
        </div>
        <div
          className={`item ${completedIsVisible ? "current" : ""}`}
          onClick={moveToCompleted}
        >
          <p id="completedText">Completed</p>
        </div>
      </div>
      <div
        className={`collectionPage-rightPane ${
          bookmarkedIsVisible ? "collectionPage-rightPane-bookmarked" : ""
        } ${ongoingIsVisible ? "collectionPage-rightPane-ongoing" : ""}
        ${completedIsVisible ? "collectionPage-rightPane-completed" : ""}`}
      >
        <div className="novelSection" id="bookmarked" ref={bookmarkedRef}>
          {browseNovels &&
            browseNovels.map((item) => {
              return (
                <Route
                  render={({ history }) => (
                    <div
                      className="novel"
                      onClick={() => {
                        history.push(`/book/book1`);
                      }}
                    >
                      <div
                        className="novel-img"
                        style={{
                          backgroundImage: `url(${item.img})`,
                        }}
                      ></div>
                      <div className="novel-info">
                        <div className="novel-info-title">{item.title}</div>
                        <div className="novel-info-other">
                          {/* <div className="novel-info-author">
                            Author: {item.author}
                          </div> */}
                          <div className="novel-info-desc">
                            {item.desc.length >= 180
                              ? item.desc.substring(0, 180) + "..."
                              : item.desc}
                          </div>
                        </div>

                        <div className="novel-info-btns">
                          <span className="btn">Start</span>
                          <span className="btn">Resume</span>
                        </div>
                      </div>
                    </div>
                  )}
                />
              );
            })}
        </div>
        <div className="novelSection" id="ongoing" ref={ongoingRef}>
          {browseNovels &&
            browseNovels.map((item) => {
              return (
                <Route
                  render={({ history }) => (
                    <div
                      className="novel"
                      onClick={() => {
                        history.push(`/book/book1`);
                      }}
                    >
                      <div
                        className="novel-img"
                        style={{
                          backgroundImage: `url(${item.img})`,
                        }}
                      ></div>
                      <div className="novel-info">
                        <div className="novel-info-title">{item.title}</div>
                        <div className="novel-info-other">
                          {/* <div className="novel-info-author">
                            Author: {item.author}
                          </div> */}
                          <div className="novel-info-desc">
                            {item.desc.length >= 180
                              ? item.desc.substring(0, 180) + "..."
                              : item.desc}
                          </div>
                        </div>

                        <div className="novel-info-btns">
                          <span className="btn">Start</span>
                          <span className="btn">Resume</span>
                        </div>
                      </div>
                    </div>
                  )}
                />
              );
            })}
        </div>
        <div className="novelSection" id="completed" ref={completedRef}>
          {browseNovels &&
            browseNovels.map((item) => {
              return (
                <Route
                  render={({ history }) => (
                    <div
                      className="novel"
                      onClick={() => {
                        history.push(`/book/book1`);
                      }}
                    >
                      <div
                        className="novel-img"
                        style={{
                          backgroundImage: `url(${item.img})`,
                        }}
                      ></div>
                      <div className="novel-info">
                        <div className="novel-info-title">{item.title}</div>
                        <div className="novel-info-other">
                          {/* <div className="novel-info-author">
                            Author: {item.author}
                          </div> */}
                          <div className="novel-info-desc">
                            {item.desc.length >= 180
                              ? item.desc.substring(0, 180) + "..."
                              : item.desc}
                          </div>
                        </div>

                        <div className="novel-info-btns">
                          <span className="btn">Start</span>
                          <span className="btn">Resume</span>
                        </div>
                      </div>
                    </div>
                  )}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default Collection;
