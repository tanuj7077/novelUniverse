import React, { useState, useEffect, useRef } from "react";
import Carousel from "../components/Carousel/Carousel";
import Thumbnail from "../components/NovelThumb/Thumbnail";
import Alert from "../components/Alert/Alert";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import { AiOutlineClockCircle } from "react-icons/ai";
import axios from "axios";
import { browseNovels } from "../mockData";
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
  useEffect(() => {
    fetchNewRelease();
    fetchMostViewed();
  }, []);

  const sliderRef = useRef(null);
  const rightBtnRef = useRef(null);
  const handleScroll = (side) => {
    console.log("clicked");
    if (side === "right") {
      sliderRef.current.scrollBy(500, 0);
    } else {
      sliderRef.current.scrollBy(-500, 0);
    }
  };
  return (
    <div className="homePage">
      <div className="homePage-container">
        <Carousel />
        <div className="homePage-novels">
          <p className="homePage-novels-heading">New Releases</p>
          <div className="homePage-novels-slider">
            <span className="leftButton" onClick={() => handleScroll("left")}>
              <VscChevronLeft className="icon" />
            </span>
            <div className="novels" ref={sliderRef}>
              <div className="novelSection">
                {newRelease.map((item) => {
                  return <Thumbnail novel={item} />;
                })}
                {newRelease.map((item) => {
                  return <Thumbnail novel={item} />;
                })}
                {newRelease.map((item) => {
                  return <Thumbnail novel={item} />;
                })}
                {newRelease.map((item) => {
                  return <Thumbnail novel={item} />;
                })}
                {newRelease.map((item) => {
                  return <Thumbnail novel={item} />;
                })}
              </div>
            </div>

            <span
              className="rightButton"
              ref={rightBtnRef}
              onClick={() => handleScroll("right")}
            >
              <VscChevronRight className="icon" />
            </span>
          </div>
        </div>
        <div className="homePage-novels">
          <p className="homePage-novels-heading">Most Viewed</p>
          <div className="novelSection">
            {mostViewed.map((item) => {
              return <Thumbnail novel={item} />;
            })}
          </div>
        </div>
        <div className="homePage-novels">
          <p className="homePage-novels-heading">Latest Updates</p>
          <div className="homePage-novelList">
            {browseNovels.map((item) => {
              return (
                <div className="homePage-novelList-novel">
                  <span
                    className="img"
                    style={{
                      backgroundImage: `url(${item.img})`,
                    }}
                  ></span>
                  <div className="info">
                    <div className="info-content">
                      <p className="info-title">
                        {item.title.substring(0, 50)}
                      </p>
                      <p className="info-chapter">Chapter: {item.chapters}</p>
                      <p className="info-updated">
                        <AiOutlineClockCircle className="info-updated-icon" />
                        <span className="info-updated-text">
                          Updated 3 minutes ago
                        </span>
                      </p>
                    </div>
                    <div className="info-buttons">
                      <div className="info-buttons-btn">Visit</div>
                      <div className="info-buttons-btn">Read</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
