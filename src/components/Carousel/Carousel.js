import React, { useEffect, useRef, useState } from "react";
import carousel2 from "../../assets/carousel2.jpg";
import carousel3 from "../../assets/carousel3.jpg";
import { useGlobalContext } from "../../context";
function Carousel() {
  const { isLoggedIn, toggleLoginModalVisibility } = useGlobalContext();
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
    <div className="homePage-carousel">
      <div
        className={`homePage-carousel-slide ${
          currentSlide === 1 ? "homePage-carousel-slide-visible" : ""
        }`}
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
            versions of world famous Japanese, Chinese and Korean light novels
            in English. Every new chapters published by the author is updated
            instantly on the website and notification service is provided to the
            readers.
          </div>
          {/* <div className="homePage-carousel-slide-cta">Explore</div> */}
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
          <div className="homePage-carousel-slide-heading">Why sign up?</div>
          <div className="homePage-carousel-slide-desc">
            Ultimate Biblio is a platform where you can read the translated
            versions of world famous Japanese, Chinese and Korean light novels
            in English. Every new chapters published by the author is updated
            instantly on the website and notification service is provided to the
            readers.
          </div>
          {!isLoggedIn && (
            <div
              className="homePage-carousel-slide-cta"
              onClick={toggleLoginModalVisibility}
            >
              Sign Up
            </div>
          )}
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
  );
}

export default Carousel;
