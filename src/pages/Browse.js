import React, { useState, useEffect } from "react";
import { genres } from "../mockData";
import { AiOutlineSearch } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { Route } from "react-router-dom";

const Browse = () => {
  let novelObj = {
    img: "https://static.lightnovelpub.com/bookcover/158x210/00016-reincarnation-of-the-strongest-sword-god-novel.jpg",
    title: "Reincarnation of the Strongest Swordsman in Universe",
    author: "Kim Yohan",
    chapters: "145",
    status: "Completed",
    rating: 4.5,
    desc: "u Ijin was the sole survivor of a plane crash when he was little. After becoming a mercenary to survive for 10 years, he returns to his family in his hometown.",
  };

  return (
    <div className="browsePage">
      <div className="search">
        <input type="text" className="search-input" placeholder="Search" />
        <AiOutlineSearch className="search-icon" />
      </div>
      <div className="genres">
        <div className="genres-heading">Genre</div>
        <div className="genres-items">
          {genres &&
            genres.map((genre) => {
              return <div className="genres-items-item">{genre}</div>;
            })}
        </div>
      </div>
      <div className="novels">
        <div className="novels-heading">Novels List</div>
        <div className="novels-filters"></div>
        <div className="novels-list">
          <div className="novel">
            <div
              className="novel-img"
              style={{
                backgroundImage: `url(${novelObj.img})`,
              }}
            ></div>
            <div className="novel-info">
              <div className="novel-info-top">
                <Route
                  render={({ history }) => (
                    <div
                      className="novel-info-top-title"
                      onClick={() => {
                        history.push(`/book/book1`);
                      }}
                    >
                      {novelObj.title}
                    </div>
                  )}
                />
                <div className="novel-info-top-rating">
                  <FaStar className="ratingIcon" />
                  <div className="ratingText">{novelObj.rating}</div>
                </div>
              </div>

              <div className="novel-info-author">
                <span className="subHeading">Author:</span>
                <span className="author">{novelObj.author}</span>
              </div>
              <div className="novel-info-chapterStatus">
                <div className="novel-info-chapters">
                  <span className="subHeading">Chapters:</span>
                  <span className="chapter">{novelObj.chapters}</span>
                </div>
                <div className="novel-info-status">
                  <span className="subHeading">Status:</span>
                  <span className="status">{novelObj.status}</span>
                </div>
              </div>
              <div className="novel-info-desc">
                {novelObj.desc.substring(0, 200)}...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Browse;
