/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Carousel from "../components/Carousel/Carousel";
import HomePageNovels from "../components/NovelThumb/HomePageNovels";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import { BsPlusCircle } from "react-icons/bs";
import { AiOutlineMinusCircle } from "react-icons/ai";
import axios from "axios";
import { categoryList } from "../mockData";
import Slider from "../pages/HomePage/Slider";

const Home = () => {
  const [newRelease, setNewRelease] = useState([]); //move to context
  const fetchNewRelease = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/book/newRelease`)
      .then((res) => {
        setNewRelease(res.data.data.newRelease);
      });
  };
  const [mostViewed, setMostViewed] = useState([]);
  const fetchMostViewed = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/book/mostViewed`)
      .then((res) => {
        setMostViewed(res.data.data.mostViewed);
      });
  };
  const [optionsVisibility, setOptionsVisibility] = useState(false);
  const [novelList, setNovelList] = useState([]);
  const [optionType, setOptionType] = useState("all"); //today,all,(action,adventure,...),latest
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_LIMIT = 12;
  const nextPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const getNovelList = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/book/getNovelByDate/${optionType}/${currentPage}/${PAGE_LIMIT}`
      )
      .then((res) => {
        setTotalPages(res.data.data.total);
        if (optionType === "today") {
          let list = [];
          res.data.data.novels.forEach((novel) => {
            list.push(novel.novelObj);
          });
          setNovelList(list);
        } else {
          setNovelList(res.data.data.novels);
        }
      });
  };
  useEffect(() => {
    fetchNewRelease();
    fetchMostViewed();
    //fetchLatestUpdates();
    //getTodayViews();
  }, []);
  useEffect(() => {
    console.log("clicked");
    getNovelList();
  }, [currentPage, optionType]);

  return (
    <div className="homePage">
      <div className="homePage-container">
        <Carousel />
        <div className="homePage-novels">
          <p className="homePage-novels-heading">New Releases</p>
          {newRelease && newRelease.length > 0 ? (
            <Slider novels={newRelease} />
          ) : (
            <div className="homePage-novels-sliderLoading">
              <div className="slider">
                <div className="slider-item"></div>
                <div className="slider-item"></div>
                <div className="slider-item"></div>
                <div className="slider-item"></div>
                <div className="slider-item"></div>
                <div className="slider-item"></div>
                <div className="slider-item"></div>
                <div className="slider-item"></div>
              </div>
            </div>
          )}
        </div>
        <div className="homePage-novels">
          <p className="homePage-novels-heading">Most Viewed</p>
          {mostViewed && mostViewed.length > 0 ? (
            <Slider novels={mostViewed} />
          ) : (
            <div className="homePage-novels-sliderLoading">
              <div className="slider">
                <div className="slider-item"></div>
                <div className="slider-item"></div>
                <div className="slider-item"></div>
                <div className="slider-item"></div>
                <div className="slider-item"></div>
                <div className="slider-item"></div>
                <div className="slider-item"></div>
                <div className="slider-item"></div>
              </div>
            </div>
          )}
        </div>

        <div className="homePage-changeable">
          <p className="homePage-changeable-heading">
            <span className="text">
              {optionType === "today" && "Most Viewed Today"}
              {optionType === "latest" && "Latest Updates"}
              {optionType === "all" && "Most Viewed Till Date"}
              {optionType !== "today" &&
                optionType !== "latest" &&
                optionType !== "all" &&
                optionType}
            </span>
            {!optionsVisibility ? (
              <BsPlusCircle
                className="icon"
                onClick={() => setOptionsVisibility(!optionsVisibility)}
              />
            ) : (
              <AiOutlineMinusCircle
                className="icon"
                onClick={() => setOptionsVisibility(!optionsVisibility)}
              />
            )}
          </p>
          <div className="homePage-changeable-container">
            <div className="homePage-changeable-container-novels">
              <div className="homePage-novelList">
                {novelList &&
                  novelList.map((novel) => {
                    return (
                      <HomePageNovels
                        key={novel._id + "homePageNovels"}
                        novel={novel}
                      />
                    );
                  })}
              </div>
              {novelList && novelList.length === 0 && (
                <div className="homePage-changeable-container-novels-notFound">
                  No novels found for selected filter
                </div>
              )}
              {novelList && novelList.length > 0 && (
                <div className="homePage-changeable-container-novels-footer">
                  <button
                    className="homePage-changeable-footer-btn"
                    onClick={previousPage}
                  >
                    <VscChevronLeft className="icon" />
                  </button>
                  <p className="homePage-changeable-footer-page">
                    {currentPage} / {totalPages}
                  </p>
                  <button
                    className="homePage-changeable-footer-btn"
                    onClick={nextPage}
                  >
                    <VscChevronRight className="icon" />
                  </button>
                </div>
              )}
            </div>

            <div className="homePage-changeable-container-options">
              <div className="homePage-changeable-container-options-option">
                <p
                  className="heading heading-latest"
                  onClick={() => {
                    setCurrentPage(1);
                    setOptionType("latest");
                  }}
                >
                  Latest Updates
                </p>
              </div>
              <div className="homePage-changeable-container-options-option">
                <p className="heading">Most Viewed</p>
                <ul className="list">
                  <li
                    className="list-item"
                    onClick={() => {
                      setCurrentPage(1);
                      setOptionType("today");
                    }}
                  >
                    Today
                  </li>
                  <li
                    className="list-item"
                    onClick={() => {
                      setCurrentPage(1);
                      setOptionType("all");
                    }}
                  >
                    All
                  </li>
                </ul>
              </div>
              <div className="homePage-changeable-container-options-option">
                <p className="heading">Genre</p>
                <ul className="list">
                  {categoryList.map((genre) => {
                    return (
                      <li
                        key={genre + "HomePage"}
                        className="list-item"
                        onClick={() => {
                          setCurrentPage(1);
                          setOptionType(genre);
                        }}
                      >
                        {genre}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="homePage-changeable-containerSmall">
            {optionsVisibility && (
              <div className="homePage-changeable-containerSmall-options">
                <div className="homePage-changeable-containerSmall-options-option">
                  <p
                    className="heading heading-latest"
                    onClick={() => {
                      setCurrentPage(1);
                      setOptionType("latest");
                    }}
                  >
                    Latest Updates
                  </p>
                </div>
                <div className="homePage-changeable-containerSmall-options-option">
                  <p className="heading">Most Viewed</p>
                  <ul className="list">
                    <li
                      className="list-item"
                      onClick={() => {
                        setCurrentPage(1);
                        setOptionType("today");
                      }}
                    >
                      Today
                    </li>
                    <li
                      className="list-item"
                      onClick={() => {
                        setCurrentPage(1);
                        setOptionType("all");
                      }}
                    >
                      All
                    </li>
                  </ul>
                </div>
                <div className="homePage-changeable-containerSmall-options-option">
                  <p className="heading">Genre</p>
                  <ul className="list">
                    {categoryList.map((genre) => {
                      return (
                        <li
                          key={genre + "HomePage"}
                          className="list-item"
                          onClick={() => {
                            setCurrentPage(1);
                            setOptionType(genre);
                          }}
                        >
                          {genre}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}
            <div className="homePage-changeable-containerSmall-novels">
              <div className="homePage-novelList">
                {novelList &&
                  novelList.map((novel) => {
                    return (
                      <HomePageNovels
                        key={novel._id + "homePageNovels"}
                        novel={novel}
                      />
                    );
                  })}
              </div>
              {novelList && novelList.length === 0 && (
                <div className="homePage-changeable-containerSmall-novels-notFound">
                  No novels found for selected filter
                </div>
              )}
            </div>
          </div>
          {novelList && novelList.length > 0 && (
            <div className="homePage-changeable-footer">
              <button
                className="homePage-changeable-footer-btn"
                onClick={previousPage}
              >
                <VscChevronLeft className="icon" />
              </button>
              <p className="homePage-changeable-footer-page">
                {currentPage} / {totalPages}
              </p>
              <button
                className="homePage-changeable-footer-btn"
                onClick={nextPage}
              >
                <VscChevronRight className="icon" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
