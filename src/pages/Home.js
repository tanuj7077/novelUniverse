import React, { useState, useEffect, useRef } from "react";
import { data, browseNovels } from "../mockData";
import { FaStar } from "react-icons/fa";
import { Route } from "react-router-dom";
import carousel1 from "../assets/carousel1.jpg";
import carousel2 from "../assets/carousel2.jpg";
import carousel3 from "../assets/carousel3.png";
const Home = () => {
  const totalSlides = 2;
  const count = useRef(0);
  const [currentSlide, setCurrentSlide] = useState(1);
  const changeSlide = (id) => {
    setCurrentSlide(id);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      count.current += 1;
      setCurrentSlide((count.current % totalSlides) + 1);
    }, 6000);
    return () => {
      clearInterval(interval);
    };
    // fetchHomePageTags();
  }, []);
  return (
    <div className="homePage">
      <div className="homePage-container">
        <div className="homePage-carousel">
          <div
            className={`homePage-carousel-slide ${
              currentSlide === 1 ? "homePage-carousel-slide-visible" : ""
            }`}
            // style={{
            //   backgroundImage: `url(${carousel1})`,
            // }}
          >
            <div
              className="homePage-carousel-slide-bg"
              style={{
                backgroundImage: `url(${carousel3})`,
              }}
            ></div>
            <div className="homePage-carousel-slide-content">
              <div className="homePage-carousel-slide-heading">
                Read Light Novel and Web Novel Translations Online
              </div>
              <div className="homePage-carousel-slide-desc">
                Ultimate Biblio is a platform where you can read the translated
                versions of world famous Japanese, Chinese and Korean light
                novels in English. Every new chapters published by the author is
                updated instantly on the website and notification service is
                provided to the readers.
              </div>
              <div className="homePage-carousel-slide-cta">Explore</div>
            </div>
          </div>
          <div
            className={`homePage-carousel-slide ${
              currentSlide === 2 ? "homePage-carousel-slide-visible" : ""
            }`}
          >
            <div
              className="homePage-carousel-slide-bg"
              style={{
                backgroundImage: `url(${carousel2})`,
              }}
            ></div>
            <div className="homePage-carousel-slide-content">
              <div className="homePage-carousel-slide-heading">
                Why sign up?
              </div>
              <div className="homePage-carousel-slide-desc">
                Ultimate Biblio is a platform where you can read the translated
                versions of world famous Japanese, Chinese and Korean light
                novels in English. Every new chapters published by the author is
                updated instantly on the website and notification service is
                provided to the readers.
              </div>
              <div className="homePage-carousel-slide-cta">Sign Up</div>
            </div>
          </div>

          <div className="homePage-carousel-navigation">
            <span
              className={`homePage-carousel-navigation-btn ${
                currentSlide === 1 ? "current" : ""
              }`}
              id="carBtn1"
              onClick={() => changeSlide(1)}
            ></span>
            <span
              className={`homePage-carousel-navigation-btn ${
                currentSlide === 2 ? "current" : ""
              }`}
              id="carBtn2"
              onClick={() => changeSlide(2)}
            ></span>
          </div>
        </div>

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

        {/* <div className="homePage-carousel">
          <div className="homePage-carousel-container">
            <div
              className="homePage-carousel-container-item"
              id="carousel1"
              style={{
                backgroundImage: `url(${carousel1})`,
              }}
            ></div>
            <div
              className="homePage-carousel-container-item"
              id="carousel2"
              style={{
                backgroundImage: `url(${carousel2})`,
              }}
            ></div>
          </div>

          <div className="homePage-carousel-navigation">
            <span
              className={`homePage-carousel-navigation-btn ${
                currentSlide.current === 1 ? "current" : ""
              }`}
              id="carBtn1"
              onClick={() => {
                currentSlide.current = 1;
                slideCarousel(1);
              }}
            ></span>
            <span
              className={`homePage-carousel-navigation-btn ${
                currentSlide.current === 2 ? "current" : ""
              }`}
              id="carBtn2"
              onClick={() => {
                currentSlide.current = 2;
                slideCarousel(2);
              }}
            ></span>
          </div>
        </div>
         */}
      </div>
    </div>
  );
};
export default Home;
