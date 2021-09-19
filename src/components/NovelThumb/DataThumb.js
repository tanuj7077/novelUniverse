import React from "react";
import { Route } from "react-router-dom";
import { FaStar } from "react-icons/fa";
const DataThumb = ({ novel }) => {
  return (
    <div className="novel">
      <div
        className="novel-img"
        style={{
          backgroundImage: `url(${novel.img})`,
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
                  {novel.title}
                </div>
              )}
            />
            <p className="author">{novel.author}</p>
          </div>

          <div className="novel-info-top-rating">
            <div className="ratingText">{novel.rating}</div>
            <FaStar className="ratingIcon" />
          </div>
        </div>

        <div className="novel-info-stats">
          <div className="novel-info-item">
            <span className="subHeading">Chapters</span>
            <span className="count">{novel.chapters}</span>
          </div>
          <div className="novel-info-item">
            <span className="subHeading">Rank</span>
            <span className="count">{novel.rank}</span>
          </div>
          <div className="novel-info-item">
            <span className="subHeading">Bookmarked</span>
            <span className="count">{novel.bookmarked}</span>
          </div>
          <div className="novel-info-item">
            <span className="subHeading">Status</span>
            <span className="count">{novel.status}</span>
          </div>
        </div>
        <div className="novel-info-desc">{novel.desc.substring(0, 200)}...</div>
        <div className="novel-info-buttons">
          <div className="btn">Read</div>
          <div className="btn">Bookmark</div>
        </div>
      </div>
    </div>
  );
};

export default DataThumb;
