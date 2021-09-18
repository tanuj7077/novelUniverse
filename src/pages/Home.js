import React, { useState, useEffect, useRef } from "react";
import { data, browseNovels } from "../mockData";
import { FaStar } from "react-icons/fa";
import { Route } from "react-router-dom";
import Carousel from "../components/Carousel/Carousel";
import Thumbnail from "../components/NovelThumb/Thumbnail";
import axios from "axios";
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
  return (
    <div className="homePage">
      <div className="homePage-container">
        <Carousel />
        <div className="homePage-novels">
          <p className="homePage-novels-heading">New Releases</p>
          <div className="novelSection">
            {newRelease.map((item) => {
              return <Thumbnail novel={item} />;
            })}
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

        {/* Test Content */}
        <div className="homePage-novels">
          <p className="homePage-novels-heading">New Releases</p>
          <div className="novelSection">
            {browseNovels &&
              browseNovels.map((item) => {
                return (
                  <Route
                    render={({ history }) => (
                      <div
                        className="novel"
                        onClick={() => {
                          history.push(`/book/book1`);
                        }}
                      >
                        <div
                          className="novel-img"
                          style={{
                            backgroundImage: `url(${item.img})`,
                          }}
                        ></div>
                        <div className="novel-info">
                          <div className="novel-info-title">{item.title}</div>
                          <div className="novel-info-other">
                            {/* <div className="novel-info-author">
                            Author: {item.author}
                          </div> */}
                            <div className="novel-info-desc">
                              {item.desc.length >= 180
                                ? item.desc.substring(0, 180) + "..."
                                : item.desc}
                            </div>
                          </div>

                          <div className="novel-info-btns">
                            <span className="btn">Start</span>
                            <span className="btn">Resume</span>
                          </div>
                        </div>
                      </div>
                    )}
                  />
                );
              })}
          </div>
        </div>
        <div className="homePage-novels">
          <p className="homePage-novels-heading">Most Viewed Today</p>
          <div className="novelSection">
            {browseNovels &&
              browseNovels.map((item) => {
                return (
                  <Route
                    render={({ history }) => (
                      <div
                        className="novel"
                        onClick={() => {
                          history.push(`/book/book1`);
                        }}
                      >
                        <div
                          className="novel-img"
                          style={{
                            backgroundImage: `url(${item.img})`,
                          }}
                        ></div>
                        <div className="novel-info">
                          <div className="novel-info-title">{item.title}</div>
                          <div className="novel-info-other">
                            {/* <div className="novel-info-author">
                            Author: {item.author}
                          </div> */}
                            <div className="novel-info-desc">
                              {item.desc.length >= 180
                                ? item.desc.substring(0, 180) + "..."
                                : item.desc}
                            </div>
                          </div>

                          <div className="novel-info-btns">
                            <span className="btn">Start</span>
                            <span className="btn">Resume</span>
                          </div>
                        </div>
                      </div>
                    )}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
