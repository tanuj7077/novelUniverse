import React, { useState, useEffect } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
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
          <p className="info-chapter">Chapter: {novel.chapters.length}</p>
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
  );
}

export default HomePageNovels;
