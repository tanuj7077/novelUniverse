import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
const Thumbnail2 = ({ novel }) => {
  return (
    <div className="novel">
      <div
        className="novel-img"
        style={{
          backgroundImage: `url(${novel.imageUrl})`,
        }}
      ></div>
      <div className="novel-info">
        <div className="novel-info-title">
          {novel.name.length > 30
            ? novel.name.substring(0, 30) + "..."
            : novel.name}
        </div>
        <div className="novel-info-other">
          <div className="novel-info-other-author novel-info-other-item">
            <p className="label">Author:</p>
            {novel.author.length > 15 ? (
              <span className="data">{novel.author.substring(0, 15)}...</span>
            ) : (
              <span className="data">{novel.author}</span>
            )}
          </div>
          <div className="novel-info-other-rating novel-info-other-item">
            <p className="label">Rating: </p>
            <p className="data">{novel.averageRating}</p>
          </div>
          <div className="novel-info-other-latest novel-info-other-item">
            <p className="label">Chapters: </p>
            <p className="data">{novel.chapters.length}</p>
          </div>
          <div className="novel-info-other-categories">
            <p className="label">Categories:</p>
            <p className="data">
              {novel.categories.map((tag, idx) => {
                return <span key={`thumbNail${tag + idx}`}>{tag}</span>;
              })}
            </p>
          </div>
        </div>

        <div className="novel-info-btns">
          <Route
            render={({ history }) => (
              <span
                className="btn"
                onClick={() => history.push(`/book/${novel._id}`)}
              >
                Visit
              </span>
            )}
          />
          <Route
            render={({ history }) => (
              <span
                className="btn"
                onClick={() => history.push(`/chapter/${novel.chapters[0].id}`)}
              >
                Start
              </span>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Thumbnail2;
