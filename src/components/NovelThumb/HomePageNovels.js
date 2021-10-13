import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";

function HomePageNovels({ novel }) {
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
            <span className="info-updated-text">Updated 3 minutes ago</span>
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
