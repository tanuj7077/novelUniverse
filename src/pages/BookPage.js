import React, { useState, useEffect, useRef } from "react";
import { FaPlay } from "react-icons/fa";
import { BiStats } from "react-icons/bi";
import { MdCollectionsBookmark } from "react-icons/md";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Chapters from "./BookPage/Chapters";
import Summary from "./BookPage/Summary";
import Reviews from "./BookPage/Reviews";
import bg1 from "../assets/bg-3.jpg";
import useOnScreen from "../components/Utilities/useOnScreen";

const BookPage = () => {
  const introRef = useRef();
  const introVisible = useOnScreen(introRef);
  const [selection, setSelection] = useState("summary");
  let novelObj = {
    img: "https://mangageko.com/media/manga_covers/cover_1_DrJkaWz.jpg",
    title: "Reincarnation of the Strongest Swordsman in Universe",
    author: "Kim Yohan",
    chapters: 145,
    status: "Completed",
    bookmarked: 1200,
    rank: 1,
    rating: {
      rating: 4.5,
      ratedBy: 1200,
    },
    tags: ["Psychology", "Action", "Horror", "Tragedy"],
    readStatus: "Start",
    desc: "U Ijin was the sole survivor of a plane crash when he was little. After becoming a mercenary to survive for 10 years, he returns to his family in his hometown.",
  };
  let allChapters = [
    "Random chapter1",
    "Random chapter2",
    "Random chapter3",
    "Random chapter4",
    "Random chapter5",
    "Random chapter6",
    "Random chapter7",
    "Random chapter8",
    "Random chapter9",
    "Random chapter10",
    "Random chapter11",
    "Random chapter12",
    "Random chapter13",
    "Random chapter14",
    "Random chapter15",
    "Random chapter16",
    "Random chapter17",
    "Random chapter18",
    "Random chapter19",
    "Random chapter20",
  ];
  return (
    <div className="bookPage">
      <div className="bookPage-container">
        <div className="introSection" ref={introRef}>
          <span
            className="introSection-bgImg"
            style={{
              backgroundImage: `url(${bg1})`,
            }}
          ></span>
          <div className="introSection-container">
            <span
              className="introSection-container-img"
              style={{
                backgroundImage: `url(${novelObj.img})`,
              }}
            ></span>
            <div className="introSection-container-content">
              <div className="introSection-container-content-titleSection">
                <p className="name">
                  <span className="novelName">{novelObj.title}</span>
                  <span className="authorName">{novelObj.author}</span>
                </p>
                <div className="ratingSection">
                  <div className="rating">{novelObj.rating.rating}</div>
                  <FaStar className="icon" />
                </div>
              </div>
              <div className="introSection-container-content-midSection">
                <div className="introSection-container-content-infoSectionCard">
                  <div className="subheading">Stats</div>
                  <div className="introSection-container-content-infoSection">
                    <div className="introSection-container-content-infoSection-item">
                      <div className="count">{novelObj.chapters}</div>
                      <div className="subheading">Chapters</div>
                    </div>
                    <div className="introSection-container-content-infoSection-item">
                      <div className="count">{novelObj.rank}</div>
                      <div className="subheading">Rank</div>
                    </div>
                    {/* <div className="introSection-container-content-infoSection-item">
                    <div className="subheading">Status</div>
                    <div className="count">{novelObj.status}</div>
                  </div> */}
                    <div className="introSection-container-content-infoSection-item">
                      <div className="count">{novelObj.bookmarked}</div>
                      <div className="subheading">Bookmarked</div>
                    </div>
                  </div>
                </div>
                <div className="introSection-container-content-otherSectionCard">
                  <div className="subheading">Categories</div>
                  <div className="introSection-container-content-categorySection">
                    {/* <div className="subheading">Categories</div> */}
                    <div className="tags">
                      {novelObj.tags.map((tag) => {
                        return <p className="tags-tag">{tag}</p>;
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="introSection-container-content-buttons">
                <div className="start btn">
                  <span className="text">{novelObj.readStatus}</span>
                </div>
                <div className="add btn">
                  <span className="text">Bookmark</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`contentSection ${
            !introVisible ? "contentSection-alignRight" : ""
          }`}
        >
          <Summary />
          <Chapters allChapters={allChapters} />
          <Reviews />
        </div>
        {/* <section className="selection">
          <div
            className={`item ${
              selection === "summary" ? "currentSelection" : ""
            }`}
            onClick={() => {
              setSelection("summary");
            }}
          >
            Summary
          </div>
          <div
            className={`item ${
              selection === "chapters" ? "currentSelection" : ""
            }`}
            onClick={() => {
              setSelection("chapters");
            }}
          >
            Chapters
          </div>
          <div
            className={`item ${
              selection === "reviews" ? "currentSelection" : ""
            }`}
            onClick={() => {
              setSelection("reviews");
            }}
          >
            Reviews
          </div>
        </section> */}

        {/* {selection === "summary" && <Summary />}
        {selection === "chapters" && <Chapters allChapters={allChapters} />}
        {selection === "reviews" && <Reviews />} */}

        <section className="commentSection"></section>
        <section className="recommendedSection"></section>
      </div>
    </div>
  );
};
export default BookPage;
