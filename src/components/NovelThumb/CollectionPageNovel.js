import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useGlobalContext } from "../../context";

const BrowsePageThumb = ({ novelId }) => {
  const { calculateTimeDifference } = useGlobalContext();
  const [time, setTime] = useState("");
  const [novel, setNovel] = useState();
  const getNovelData = async () => {
    console.log("getNovelData called");
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/book/${novelId}`)
      .then((res) => {
        setNovel(res.data.data.novel);
        setTime(calculateTimeDifference(res.data.data.novel.latestUpdate));
      });
  };
  useEffect(() => {
    getNovelData();
  }, []);
  return (
    <>
      {novel && (
        <Route
          render={({ history }) => (
            <div
              className="novels-novel"
              onClick={() => {
                history.push(`/book/${novel._id}`);
              }}
            >
              <span
                className="img"
                style={{
                  backgroundImage: `url(${novel.imageUrl})`,
                }}
              ></span>
              <div className="info">
                <div className="info-content">
                  <p className="info-title">{novel.name.substring(0, 50)}</p>
                  <p className="info-chapter">
                    Chapters: {novel.chapters.length}
                  </p>
                  <p className="info-updated">
                    <AiOutlineClockCircle className="info-updated-icon" />
                    <span className="info-updated-text">{time} ago</span>
                  </p>
                </div>
                <div className="info-buttons">
                  <div className="info-buttons-btn">Visit</div>
                  <div className="info-buttons-btn">Read</div>
                </div>
              </div>
            </div>
          )}
        />
      )}
    </>
  );
};

export default BrowsePageThumb;
