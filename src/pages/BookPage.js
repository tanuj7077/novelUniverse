import React, { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { MdCollectionsBookmark } from "react-icons/md";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const BookPage = () => {
  const LIMIT = 8;
  const [chapters, setChapters] = useState([]);
  let novelObj = {
    img: "https://static.lightnovelpub.com/bookcover/158x210/00016-reincarnation-of-the-strongest-sword-god-novel.jpg",
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
  const paginate = () => {
    let count = Math.ceil(allChapters.length / LIMIT);
    let arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(allChapters.slice(i * LIMIT, (i + 1) * LIMIT));
    }
    setChapters(arr);
  };
  useEffect(() => {
    paginate();
  }, []);
  return (
    <div className="bookPage">
      <section className="introSection">
        <div className="introSection-img">
          <div
            className="image"
            style={{
              backgroundImage: `url(${novelObj.img})`,
            }}
          ></div>
        </div>
        <div className="introSection-info">
          <div className="introSection-info-top">
            <div className="introSection-info-main">
              <p className="introSection-info-title">{novelObj.title}</p>
              <p className="introSection-info-author">
                <span className="subheading">Author: </span>
                {novelObj.author}
              </p>
            </div>
            <div className="introSection-info-rating">
              <div className="rating">{novelObj.rating.rating}</div>
              <FaStar className="icon" />
            </div>
          </div>

          <div className="introSection-info-other">
            <p className="otherInfo">
              <span className="subheading">Chapters</span>
              <span className="content">{novelObj.chapters}</span>
            </p>
            <p className="otherInfo">
              <span className="subheading">Rank</span>
              <span className="content">{novelObj.rank}</span>
            </p>
            <p className="otherInfo">
              <span className="subheading">Status</span>
              <span className="content">{novelObj.status}</span>
            </p>
            <p className="otherInfo">
              <span className="subheading">Bookmarked</span>
              <span className="content">{novelObj.bookmarked}</span>
            </p>
          </div>
          <div className="introSection-info-tags">
            <p className="subheading">Categories</p>
            <div className="tags">
              {novelObj.tags.map((tag) => {
                return <p className="tag">{tag}</p>;
              })}
            </div>
          </div>
          <div className="introSection-info-buttons">
            <div className="add btn">
              <MdCollectionsBookmark className="icon" />
              <span className="text">Add to Collection</span>
            </div>
            <div className="start btn">
              <FaPlay className="icon" />
              <span className="text">{novelObj.readStatus}</span>
            </div>
          </div>
        </div>
      </section>
      <section className="selection">
        <div className="item">Summary</div>
        <div className="item">Chapters</div>
        <div className="item">Reviews</div>
      </section>

      <section className="chapterSection">
        <div className="chapterSection-latest">
          <div className="subheading">Latest Release:</div>
          <div className="chapter">
            Chapter {allChapters.length - 1}:{" "}
            {allChapters[allChapters.length - 1]}
          </div>
        </div>
        <div className="chapterSection-goto">
          <div className="goto">
            <p className="subheading">Enter Chapter: </p>
            <input type="number" className="chapterInput" value="1" />
            <p className="gotoBtn">Go!</p>
          </div>
          <div className="pageChange">
            <FaChevronLeft className="pageChange-icon" />
            <div className="page">1 / 3</div>
            <FaChevronRight className="pageChange-icon" />
          </div>
        </div>
        <div className="chapterSection-chapters">
          {/* <div className="chapters"> */}
          {allChapters.map((chapter, index) => {
            return (
              <div className="chapter">
                <p className="count">Chapter: {index + 1}</p>
                <p className="chapterName">{chapter}</p>
              </div>
            );
          })}
          {/* </div> */}
        </div>
      </section>
      <section className="aboutSection">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </section>
      <section className="commentSection"></section>
      <section className="recommendedSection"></section>
    </div>
  );
};
export default BookPage;
