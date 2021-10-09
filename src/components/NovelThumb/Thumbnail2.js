import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
const Thumbnail2 = ({ novel }) => {
  const [averageRating, setAverageRating] = useState(0);
  const calculateAverageRating = () => {
    let total = 0;
    let ratingTotal = 0;
    if (novel) {
      for (let k in novel.rating) {
        total += novel.rating[k];
        ratingTotal += parseInt(k) * novel.rating[k];
      }
    }
    if (total === 0) {
      setAverageRating(0);
    } else {
      let averageRating = Math.round((ratingTotal / total) * 10) / 10;
      setAverageRating(averageRating);
    }
  };
  useEffect(() => {
    calculateAverageRating();
  }, []);
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
              <div className="novel-info-other-author novel-info-other-item">
                <p className="label">Author:</p>
                {novel.author.length > 15 ? (
                  <p className="data">{novel.author.substring(0, 15)}...</p>
                ) : (
                  <p className="data">{novel.author}</p>
                )}
              </div>
              <div className="novel-info-other-rating novel-info-other-item">
                <p className="label">Rating: </p>
                <p className="data">{averageRating}</p>
              </div>
              <div className="novel-info-other-latest novel-info-other-item">
                <p className="label">Chapters: </p>
                <p className="data">{novel.chapters.length}</p>
              </div>
              <div className="novel-info-other-categories">
                <p className="label">Categories:</p>
                <p className="data">
                  {novel.categories.map((tag) => {
                    return <p>{tag}</p>;
                  })}
                </p>
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

export default Thumbnail2;
