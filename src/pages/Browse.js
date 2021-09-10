import React, { useState, useEffect } from "react";
import { genres, browseNovels } from "../mockData";
import { AiOutlineSearch } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { Route } from "react-router-dom";
import bg1 from "../assets/abstract/12.jpg";
//1,2,3,6,7,9,11,12

const Browse = () => {
  let status = ["All", "Completed", "Ongoing"];
  let order = ["Views", "New", "Ratings"];
  return (
    <div className="browsePage">
      <span
        className="browsePage-bg"
        style={{
          backgroundImage: `url(${bg1})`,
        }}
      ></span>
      <div className="browsePage-container">
        <div className="browsePage-container-top">
          <div className="search">
            <input type="text" className="search-input" placeholder="Search" />
            <AiOutlineSearch className="search-icon" />
          </div>
          <div className="filters">
            <div className="genres">
              <div className="genres-heading">Genre</div>
              <div className="genres-items">
                {genres &&
                  genres.map((genre) => {
                    return <div className="genres-items-item">{genre}</div>;
                  })}
              </div>
            </div>
            <div className="genres">
              <div className="genres-heading">Status</div>
              <div className="genres-items">
                {genres &&
                  status.map((item) => {
                    return <div className="genres-items-item">{item}</div>;
                  })}
              </div>
            </div>
            <div className="genres">
              <div className="genres-heading">Order By</div>
              <div className="genres-items">
                {genres &&
                  order.map((item) => {
                    return <div className="genres-items-item">{item}</div>;
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className="novels">
          <div className="novels-heading">Novels List</div>
          <div className="novels-filters"></div>
          <div className="novels-list">
            {browseNovels.map((item) => {
              return (
                <div className="novel">
                  <div
                    className="novel-img"
                    style={{
                      backgroundImage: `url(${item.img})`,
                    }}
                  ></div>
                  <div className="novel-info">
                    <div className="novel-info-top">
                      <div className="novel-info-top-title">
                        <Route
                          render={({ history }) => (
                            <div
                              className="name"
                              onClick={() => {
                                history.push(`/book/book1`);
                              }}
                            >
                              {item.title}
                            </div>
                          )}
                        />
                        <p className="author">{item.author}</p>
                      </div>

                      <div className="novel-info-top-rating">
                        <div className="ratingText">{item.rating}</div>
                        <FaStar className="ratingIcon" />
                      </div>
                    </div>

                    <div className="novel-info-stats">
                      <div className="novel-info-item">
                        <span className="subHeading">Chapters</span>
                        <span className="count">{item.chapters}</span>
                      </div>
                      <div className="novel-info-item">
                        <span className="subHeading">Rank</span>
                        <span className="count">{item.rank}</span>
                      </div>
                      <div className="novel-info-item">
                        <span className="subHeading">Bookmarked</span>
                        <span className="count">{item.bookmarked}</span>
                      </div>
                      <div className="novel-info-item">
                        <span className="subHeading">Status</span>
                        <span className="count">{item.status}</span>
                      </div>
                    </div>
                    <div className="novel-info-desc">
                      {item.desc.substring(0, 200)}...
                    </div>
                    <div className="novel-info-buttons">
                      <div className="btn">Read</div>
                      <div className="btn">Bookmark</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Browse;
