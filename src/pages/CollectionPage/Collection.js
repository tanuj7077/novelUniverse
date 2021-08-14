import React, { useState, useEffect } from "react";
import { browseNovels } from "../../mockData";
import { FaStar } from "react-icons/fa";
import { Route } from "react-router-dom";
const Collection = () => {
  return (
    <div className="collectionPage">
      <div className="collectionPage-leftPane">
        <div className="item">Bookmarked</div>
        <div className="item">Continue Reading</div>
        <div className="item">Completed</div>
      </div>
      <div className="collectionPage-rightPane">
        <div className="novelSection">
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
        <div className="novelSection">
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
        <div className="novelSection">
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
