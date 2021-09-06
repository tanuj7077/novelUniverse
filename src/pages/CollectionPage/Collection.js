import React, { useState, useEffect, useRef } from "react";
import { browseNovels } from "../../mockData";
import { FaStar } from "react-icons/fa";
import { Route } from "react-router-dom";
import useOnScreen from "../../components/Utilities/useOnScreen";
const Collection = () => {
  const [current, setCurrent] = useState("bookmarked");
  const bookmarkedRef = useRef();
  const bookmarkedIsVisible = useOnScreen(bookmarkedRef);
  const ongoingRef = useRef();
  const ongoingIsVisible = useOnScreen(ongoingRef);
  const completedRef = useRef();
  const completedRefIsVisible = useOnScreen(completedRef);
  return (
    <div className="collectionPage">
      <div className="collectionPage-leftPane">
        <div className={`item ${bookmarkedIsVisible ? "current" : ""}`}>
          Bookmarked
        </div>
        <div className={`item ${ongoingIsVisible ? "current" : ""}`}>
          Ongoing
        </div>
        <div className={`item ${completedRefIsVisible ? "current" : ""}`}>
          Completed
        </div>
      </div>
      <div className="collectionPage-rightPane">
        <div className="novelSection" ref={bookmarkedRef}>
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
        <div className="novelSection" ref={ongoingRef}>
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
        <div className="novelSection" ref={completedRef}>
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
      {/* <div className="collectionSection">
        <div className="collectionSection-leftPane">
          <div className="heading">Continue Reading</div>
        </div>
        <div className="collectionSection-rightPane"></div>
      </div>
      <div className="collectionSection">
        <div className="collectionSection-leftPane">
          <div className="heading">Continue Reading</div>
        </div>
        <div className="collectionSection-rightPane"></div>
      </div>
      <div className="collectionSection">
        <div className="collectionSection-leftPane">
          <div className="heading">Continue Reading</div>
        </div>
        <div className="collectionSection-rightPane"></div>
      </div> */}
    </div>
  );
};
export default Collection;
