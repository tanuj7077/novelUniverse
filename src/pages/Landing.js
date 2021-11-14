import React, { useEffect, useState } from "react";
import TopNav from "../components/Navigation/TopNav";
import { Route } from "react-router-dom";
import logo from "../logo.svg";
import img1 from "../assets/slideshow/1.jpg";
import img2 from "../assets/slideshow/2.jpg";
import img3 from "../assets/slideshow/3.jpg";
import img4 from "../assets/slideshow/4.jpg";
import img5 from "../assets/slideshow/5.jpg";
import img6 from "../assets/slideshow/6.jpg";
import { categoryList } from "../mockData";
const Landing = () => {
  ///all elements which are to be shown on scroll
  // var elementsToShow = document.querySelectorAll(".show-on-scroll");
  function loop() {
    var elementsToShow = document.querySelectorAll(".show-on-scroll");
    console.log(elementsToShow);
    elementsToShow.forEach((element) => {
      if (isElementInViewPort(element)) {
        element.classList.add("isVisible");
      } else {
        element.classList.remove("isVisible");
      }
    });
  }

  function isElementInViewPort(el) {
    var rect = el.getBoundingClientRect();
    return (
      (rect.top <= 0 && rect.bottom >= 0) ||
      (rect.bottom >=
        (window.innerHeight || document.documentElement.clientHeight) &&
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight)) ||
      (rect.top >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight))
    );
  }
  useEffect(() => {
    const interval = setInterval(() => {
      loop();
    }, 1000 / 24);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="landing">
      <nav className="landing-topNav">
        <div className="landing-topNav-logo">
          <img src={logo} alt="" className="icon" />
          <div className="text">NovelUpdates</div>
        </div>
        <div className="landing-topNav-button">Login</div>
      </nav>
      <section className="landing-item landing-item-intro">
        <div className="textContent">
          <p className="textContent-large">Heading Content Extended</p>
          <p className="textContent-small">
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </p>
        </div>
        <div className="mediaContent">
          <div className="mediaContent-slideshow">
            <div className="mediaContent-slideshow-slideTrack">
              <div
                className="slide"
                style={{
                  backgroundImage: `url(${img1})`,
                }}
              ></div>
              <div
                className="slide"
                style={{
                  backgroundImage: `url(${img2})`,
                }}
              ></div>
              <div
                className="slide"
                style={{
                  backgroundImage: `url(${img3})`,
                }}
              ></div>
              <div
                className="slide"
                style={{
                  backgroundImage: `url(${img4})`,
                }}
              ></div>
              <div
                className="slide"
                style={{
                  backgroundImage: `url(${img5})`,
                }}
              ></div>
              <div
                className="slide"
                style={{
                  backgroundImage: `url(${img6})`,
                }}
              ></div>
              {/* repeat */}
              <div
                className="slide"
                style={{
                  backgroundImage: `url(${img1})`,
                }}
              ></div>
              <div
                className="slide"
                style={{
                  backgroundImage: `url(${img2})`,
                }}
              ></div>
              <div
                className="slide"
                style={{
                  backgroundImage: `url(${img3})`,
                }}
              ></div>
              <div
                className="slide"
                style={{
                  backgroundImage: `url(${img4})`,
                }}
              ></div>
              <div
                className="slide"
                style={{
                  backgroundImage: `url(${img5})`,
                }}
              ></div>
              <div
                className="slide"
                style={{
                  backgroundImage: `url(${img6})`,
                }}
              ></div>
            </div>
            <div className="mediaContent-slideshow-genres">
              {categoryList.slice(0, 24).map((item) => {
                return <div className="genre">{item}</div>;
              })}
            </div>
          </div>
        </div>
      </section>
      <section className="landing-item landing-item-filters">
        <div className="mediaContent show-on-scroll">Test Media Contents</div>
        <div className="textContent">
          <p className="textContent-large">Easy to use Filters</p>
          <p className="textContent-small">
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </p>
        </div>
      </section>
      <section className="landing-item landing-item-collection">
        <div className="textContent">
          <p className="textContent-large">Add novels to your Collection</p>
          <p className="textContent-small">
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </p>
        </div>
        <div className="mediaContent show-on-scroll">Test Media Content</div>
      </section>
      <section className="landing-item landing-item-notification">
        <div className="mediaContent show-on-scroll">Test Media Content</div>
        <div className="textContent">
          <p className="textContent-large">Get customized notification</p>
          <p className="textContent-small">
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </p>
        </div>
      </section>
      <section className="landing-item landing-item-follow">
        <div className="textContent">
          <p className="textContent-large">Follow users</p>
          <p className="textContent-small">
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </p>
        </div>
        <div className="mediaContent show-on-scroll">Test Media Content</div>
      </section>
      <section className="landing-item landing-item-reading">
        <div className="mediaContent show-on-scroll">Test Media Content</div>
        <div className="textContent">
          <p className="textContent-large">Customize Chapter View</p>
          <p className="textContent-small">
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </p>
        </div>
      </section>
    </div>
  );
};
export default Landing;
