import React from "react";
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
    </div>
  );
};
export default Landing;
