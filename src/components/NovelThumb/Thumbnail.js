import React from "react";
import { Route } from "react-router-dom";
const Thumbnail = ({ novel }) => {
  return (
    <Route
      render={({ history }) => (
        <div
          className="novel"
          onClick={() => {
            history.push(`/book/${novel._id}`);
          }}
        >
          <div
            className="novel-img"
            style={{
              backgroundImage: `url(${novel.imageUrl})`,
            }}
          ></div>
          <div className="novel-info">
            <div className="novel-info-title">{novel.name}</div>
            <div className="novel-info-other">
              <div className="novel-info-desc">
                {novel.description.length >= 180
                  ? novel.description.substring(0, 180) + "..."
                  : novel.description}
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
};

export default Thumbnail;
