import React, { useState, useEffect, useRef } from "react";
import Carousel from "../components/Carousel/Carousel";
import HomePageNovels from "../components/NovelThumb/HomePageNovels";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsFillPlusCircleFill, BsPlusCircle } from "react-icons/bs";
import axios from "axios";
import { categoryList } from "../mockData";
import Slider from "../pages/HomePage/Slider";
import { useGlobalContext } from "../context";

const Home = () => {
  const [newRelease, setNewRelease] = useState([]); //move to context
  const fetchNewRelease = async () => {
    await axios.get("http://localhost:8000/book/newRelease").then((res) => {
      setNewRelease(res.data.data.newRelease);
    });
  };
  const [mostViewed, setMostViewed] = useState([]);
  const fetchMostViewed = async () => {
    await axios.get("http://localhost:8000/book/mostViewed").then((res) => {
      setMostViewed(res.data.data.mostViewed);
    });
  };
  const [latestUpdates, setLatestUpdates] = useState([]);
  const fetchLatestUpdates = async () => {
    await axios.get("http://localhost:8000/book/latestUpdates").then((res) => {
      setLatestUpdates(res.data.data.latestUpdates);
    });
  };
  const [optionsVisibility, setOptionsVisibility] = useState(false);
  const [novelList, setNovelList] = useState([]);
  const [optionType, setOptionType] = useState("today"); //today,all,(action,adventure,...),latest
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_LIMIT = 15;
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
        `http://localhost:8000/book/getNovelByDate/${optionType}/${currentPage}/${PAGE_LIMIT}`
      )
      .then((res) => {
        console.log(res.data.data.novels);
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
    fetchLatestUpdates();
    //getTodayViews();
  }, []);
  useEffect(() => {
    getNovelList();
  }, [currentPage, optionType]);

  return (
    <div className="homePage">
      <div className="homePage-container">
        <Carousel />
        <div className="homePage-novels">
          <p className="homePage-novels-heading">New Releases</p>
          <Slider novels={newRelease} />
        </div>
        <div className="homePage-novels">
          <p className="homePage-novels-heading">Most Viewed</p>
          <Slider novels={mostViewed} />
        </div>
        <div className="homePage-changeable">
          <p className="homePage-changeable-heading">
            <span className="text">Novel List</span>
            <BsPlusCircle
              className="icon"
              onClick={() => setOptionsVisibility(!optionsVisibility)}
            />
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
              <div className="homePage-changeable-container-novels-footer">
                <button className="homePage-changeable-footer-btn">
                  <VscChevronLeft className="icon" />
                </button>
                <p className="homePage-changeable-footer-page">
                  {currentPage} / {totalPages}
                </p>
                <button className="homePage-changeable-footer-btn">
                  <VscChevronRight className="icon" />
                </button>
              </div>
            </div>

            <div className="homePage-changeable-container-options">
              <div className="homePage-changeable-container-options-option">
                <p
                  className="heading heading-latest"
                  onClick={() => setOptionType("latest")}
                >
                  Latest Updates
                </p>
              </div>
              <div className="homePage-changeable-container-options-option">
                <p className="heading">Most Viewed</p>
                <ul className="list">
                  <li
                    className="list-item"
                    onClick={() => setOptionType("today")}
                  >
                    Today
                  </li>
                  <li
                    className="list-item"
                    onClick={() => setOptionType("all")}
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
                        onClick={() => setOptionType(genre)}
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
                    onClick={() => setOptionType("latest")}
                  >
                    Latest Updates
                  </p>
                </div>
                <div className="homePage-changeable-containerSmall-options-option">
                  <p className="heading">Most Viewed</p>
                  <ul className="list">
                    <li
                      className="list-item"
                      onClick={() => setOptionType("today")}
                    >
                      Today
                    </li>
                    <li
                      className="list-item"
                      onClick={() => setOptionType("all")}
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
                          onClick={() => setOptionType(genre)}
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
            </div>
          </div>
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
        </div>
      </div>
    </div>
  );
};
export default Home;
