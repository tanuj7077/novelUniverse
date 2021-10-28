import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AiOutlineFontSize } from "react-icons/ai";
import { IoMdColorPalette } from "react-icons/io";
import { CgDarkMode } from "react-icons/cg";
import { useParams, Route, useHistory } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../context";
import Comments from "./Comments/Comments";

const Chapter = () => {
  const { userData, isLoggedIn, addChapterRead } = useGlobalContext();
  const { id } = useParams();
  const [chapterInput, setChapterInput] = useState("1");
  const [chapterSelectionPopupVis, setChapterSelectionPopupVis] =
    useState(false);
  const [fontPopupVis, setFontPopupVis] = useState(false);
  const [fontSizeVal, setFontSizeVal] = useState(2);
  const [fontSize, setFontSize] = useState("largeFont");
  const [letterSpacing, setLetterSpacing] = useState("smallSpace");
  const [myComment, setMyComment] = useState("");
  const [darkMode, setDarkMode] = useState(0);
  const history = useHistory();

  const handleFontSize = () => {
    if (fontSizeVal == 0) {
      setFontSize("smallFont");
    } else if (fontSizeVal == 1) {
      setFontSize("mediumFont");
    } else if (fontSizeVal == 2) {
      setFontSize("largeFont");
    } else if (fontSizeVal == 3) {
      setFontSize("largestFont");
    }
  };
  const toggleColor = () => {
    setDarkMode(!darkMode);
  };
  useEffect(() => {
    handleFontSize();
  }, [fontSizeVal]);

  const [chapterData, setChapterData] = useState();
  const getChapterDetails = () => {
    axios.get(`http://localhost:8000/chapter/${id}`).then((res) => {
      console.log(res.data.data.chapterData);
      setChapterData(res.data.data.chapterData);
      if (isLoggedIn && userData) {
        addChapterRead(
          res.data.data.chapterData.bookId,
          res.data.data.chapterData.id,
          userData._id
        );
      }
    });
  };
  const prevChapter = () => {
    console.log("prev clicked");
    if (chapterData && chapterData.prevChapter) {
      history.push(`/chapter/${chapterData.prevChapter}`);
    }
  };
  const nextChapter = () => {
    console.log("next clicked");
    if (chapterData && chapterData.nextChapter) {
      history.push(`/chapter/${chapterData.nextChapter}`);
    }
  };
  const selectChapter = (num) => {
    let chapterId;
    if (chapterData) {
      chapterData.allChapters.forEach((item) => {
        if (item.number === num) {
          chapterId = item.id;
        }
      });
    }
    history.push(`/chapter/${chapterId}`);
  };
  useEffect(() => {
    getChapterDetails();
  }, [id]);

  return (
    <div className="chapterPage">
      <div className="chapterPage-top">
        <section className="left">
          <Route
            render={({ history }) => (
              <CgDarkMode
                className="logo"
                onClick={() => {
                  history.push(`/home`);
                }}
              />
            )}
          />

          {chapterData && (
            <p className="info">
              <span className="bookName">{chapterData.bookName}</span>
              {/* <BsChevronRight className="div" />
              <span className="currentChapter">{chapter}</span> */}
            </p>
          )}
        </section>
        <section className="middle">
          <FaChevronLeft className="chevron" onClick={prevChapter} />
          {chapterData && (
            <p
              className="currentChapter"
              onClick={() => {
                setChapterSelectionPopupVis(!chapterSelectionPopupVis);
              }}
            >
              #{chapterData.chapterNumber}
            </p>
          )}
          <FaChevronRight className="chevron" onClick={nextChapter} />
          <div
            className={`chapterSelectionPopup ${
              chapterSelectionPopupVis ? "popupVisible" : ""
            }`}
          >
            <section className="goto">
              <input
                type="number"
                className="chapterInput"
                value={chapterInput}
                onChange={(e) => {
                  if (+e.target.value <= chapterData.allChapters.length) {
                    setChapterInput(e.target.value);
                  }
                }}
              />
              <button
                className="gotoBtn"
                onClick={() => selectChapter(parseInt(chapterInput))}
              >
                Load
              </button>
            </section>
            {chapterData && (
              <ul className="chapterList">
                {chapterData.allChapters.map((chapter, index) => {
                  return (
                    <li
                      className="chapter"
                      onClick={() => selectChapter(chapter.number)}
                    >
                      #{chapter.number} {chapter.name}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>
        <section className="right">
          <AiOutlineFontSize
            className="customization"
            onClick={() => {
              setFontPopupVis(!fontPopupVis);
            }}
          />
          <IoMdColorPalette
            className="customization"
            onClick={() => {
              toggleColor();
            }}
          />
          <div className={`fontPopup ${fontPopupVis ? "popupVisible" : ""}`}>
            <div className="fontSize">
              <p className="fontSizeText">Font Size: </p>
              <input
                type="range"
                min="0"
                max="3"
                step="1"
                value={fontSizeVal}
                onChange={(e) => setFontSizeVal(e.target.value)}
              ></input>
            </div>
            {/* <div className="letterSpacing">
              <p className="letterSpacingText">Letter Spacing: </p>
              <input type="range" min="0" max="3" step="1"></input>
            </div> */}
          </div>
        </section>
      </div>
      <div className={`chapterPage-body ${darkMode ? "darkChapterBody" : ""}`}>
        {chapterData && (
          <p className="chapterPage-title">{chapterData.chapterName}</p>
        )}
        <div className={`chapterPage-chapter`}>
          {chapterData && (
            <div className={`${fontSize} ${letterSpacing}`}>
              {chapterData.chapterContent}
            </div>
          )}
        </div>
        {chapterData && <Comments chapterInfo={chapterData} />}
      </div>
    </div>
  );
};

export default Chapter;
