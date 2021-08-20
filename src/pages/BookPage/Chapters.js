import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Route } from "react-router-dom";

function Chapters({ allChapters }) {
  const LIMIT = 8;
  const [chapterInput, setChapterInput] = useState("1");
  const [chapters, setChapters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [chapterTransitionStat, setChapterTransitionStat] = useState("");
  const paginate = () => {
    let count = Math.ceil(allChapters.length / LIMIT);
    setTotalPage(count);
    let arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(allChapters.slice(i * LIMIT, (i + 1) * LIMIT));
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
          chapters[page - 1].map((chapter, index) => {
            return (
              <Route
                render={({ history }) => (
                  <div
                    className={`chapter ${chapterTransitionStat}`}
                    onClick={() => {
                      history.push(
                        `/chapter/${(page - 1) * LIMIT + index + 1}`
                      );
                    }}
                  >
                    <p className="count">
                      Chapter: {(page - 1) * LIMIT + index + 1}
                    </p>
                    <p className="chapterName">{chapter}</p>
                  </div>
                )}
              />
            );
          })}
      </div>
    </section>
  );
}

export default Chapters;
