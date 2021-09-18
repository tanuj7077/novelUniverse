import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Route } from "react-router-dom";

function ChapterSection({ allChapters, Chapters }) {
  const LIMIT = 8;
  const [chapterInput, setChapterInput] = useState("1");
  const [chapters, setChapters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [chapterTransitionStat, setChapterTransitionStat] = useState("");
  const paginate = () => {
    let count = Math.ceil(Chapters.length / LIMIT);
    setTotalPage(count);
    let arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(Chapters.slice(i * LIMIT, (i + 1) * LIMIT));
    }
    setChapters(arr);
  };
  const pageChange = (dir) => {
    setChapterTransitionStat("fadeAway");
    setTimeout(() => {
      if (dir === "prev") {
        page > 1 ? setPage(page - 1) : setPage(totalPage);
      } else {
        page < totalPage ? setPage(page + 1) : setPage(1);
      }
      setChapterTransitionStat("fadeIn");
    }, 200);
  };
  useEffect(() => {
    paginate();
    setChapterTransitionStat("fadeIn");
  }, []);
  return (
    <section className="chapterSection">
      <p className="chapterSection-subheading">Chapters</p>
      <p className="chapterSection-latest">
        <span className="subheading">Latest Release:</span>
        <span className="chapter">{allChapters[allChapters.length - 1]}</span>
      </p>
      <div className="chapterSection-goto">
        <div className="goto">
          <input
            type="number"
            className="chapterInput"
            value={chapterInput}
            onChange={(e) => {
              if (+e.target.value <= allChapters.length) {
                setChapterInput(e.target.value);
              }
            }}
          />
          <p className="gotoBtn">Go!</p>
        </div>
        <div className="pageChange">
          <FaChevronLeft
            className="pageChange-icon"
            onClick={() => pageChange("prev")}
          />
          <div className="page">
            {page} / {totalPage}
          </div>
          <FaChevronRight
            className="pageChange-icon"
            onClick={() => pageChange("next")}
          />
        </div>
      </div>
      <div className="chapterSection-chapters">
        {chapters[page - 1] &&
          chapters[page - 1].map((item) => {
            return (
              <Route
                render={({ history }) => (
                  <div
                    className={`chapter ${chapterTransitionStat}`}
                    onClick={() => {
                      history.push(`/chapter/${item.id}`);
                    }}
                  >
                    <p className="count">Chapter: {item.number}</p>
                    <p className="chapterName">{item.name}</p>
                  </div>
                )}
              />
            );
          })}
      </div>
    </section>
  );
}

export default ChapterSection;
