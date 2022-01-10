import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { AiOutlineClockCircle, AiOutlineBook } from "react-icons/ai";
import { useGlobalContext } from "../../context";
function HomePageNovels({ novel }) {
  const { calculateTimeDifference } = useGlobalContext();
  const [time, setTime] = useState("");
  useEffect(() => {
    setTime(calculateTimeDifference(novel.latestUpdate));
  }, [novel]);
  return (
    <div className="homePage-novelList-novel">
      <span
        className="img"
        style={{
          backgroundImage: `url(${novel.imageUrl})`,
        }}
      ></span>
      <div className="info">
        <div className="info-content">
          <p className="info-title">{novel.name.substring(0, 50)}</p>
          <Route
            render={({ history }) => (
              <p
                className="info-chapter"
                onClick={() =>
                  history.push(
                    `/chapter/${novel.chapters[novel.chapters.length - 1].id}`
                  )
                }
              >
                <AiOutlineBook className="info-chapter-icon" />
                <span className="info-chapter-text">
                  Chapter {novel.chapters.length}
                </span>
              </p>
            )}
          />
          <p className="info-updated">
            <AiOutlineClockCircle className="info-updated-icon" />
            <span className="info-updated-text">{time} ago</span>
          </p>
        </div>
        <div className="info-buttons">
          <Route
            render={({ history }) => (
              <div
                className="info-buttons-btn"
                onClick={() => history.push(`/book/${novel._id}`)}
              >
                Visit
              </div>
            )}
          />
          <Route
            render={({ history }) => (
              <div
                className="info-buttons-btn"
                onClick={() => history.push(`/chapter/${novel.chapters[0].id}`)}
              >
                Start
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePageNovels;
