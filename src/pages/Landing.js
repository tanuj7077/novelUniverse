/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import logo from "../assets/logo/Asset4.png";
import logoMono from "../assets/logo/novelUpdatesLogo7.svg";
import img1 from "../assets/slideshow/1.jpg";
import img2 from "../assets/slideshow/2.jpg";
import img3 from "../assets/slideshow/3.jpg";
import img4 from "../assets/slideshow/4.jpg";
import img5 from "../assets/slideshow/5.jpg";
import img6 from "../assets/slideshow/6.jpg";
import { categoryList } from "../mockData";
import { BsFillPlayFill, BsCollectionFill, BsPeopleFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { ImFilter } from "react-icons/im";
import { IoNotifications } from "react-icons/io5";
import { CgDarkMode } from "react-icons/cg";
import { useGlobalContext } from "../context";

const Landing = () => {
  const { isLoggedIn, toggleLoginModalVisibility } = useGlobalContext();
  ///all elements which are to be shown on scroll
  // var elementsToShow = document.querySelectorAll(".show-on-scroll");
  function loop() {
    var elementsToShow = document.querySelectorAll(".show-on-scroll");
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
      <section className="landing-item landing-item-intro">
        <div className="bg"></div>
        <div className="bg2"></div>
        <div className="bg3"></div>
        <nav className="landing-topNav">
          {/* <div className="landing-topNav-logo">
            <img src={logo} alt="" className="icon" />
            <div className="text"></div>
          </div> */}
          <div className="landing-topNav-logo">
            <img src={logoMono} alt="" className="icon" />
            <div className="text">
              Novel<br></br>Universe
            </div>
          </div>
          {/* {!isLoggedIn && (
            <div
              className="landing-topNav-button"
              onClick={toggleLoginModalVisibility}
            >
              Login
            </div>
          )} */}
        </nav>
        <div className="textContent">
          <p className="textContent-large">Your Daily dose of Novels</p>
          <p className="textContent-small">
            Novel Universe is a platform where you can read the translated
            versions of world famous Japanese, Chinese and Korean light novels
            in English.
          </p>
          <Route
            render={({ history }) => (
              <button
                className="textContent-cta"
                onClick={() => {
                  history.push(`/home`);
                }}
              >
                Let's Go
              </button>
            )}
          />
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
              {categoryList.slice(0, 19).map((item) => {
                return <div className="genre">{item}</div>;
              })}
            </div>
          </div>
        </div>
      </section>
      <section className="landing-item landing-item-filters">
        <div className="media">
          <div className="mediaContent show-on-scroll">
            <div className="mediaContent-filters">
              <div className="mediaContent-filters-type">
                <p className="mediaContent-filters-type-heading">Most Viewed</p>
                <div className="mediaContent-filters-type-list">
                  {categoryList.slice(0, 3).map((item) => {
                    return <div className="item">{item}</div>;
                  })}
                </div>
              </div>
              <div className="mediaContent-filters-type">
                <p className="mediaContent-filters-type-heading">Genres</p>
                <div className="mediaContent-filters-type-list">
                  {categoryList.slice(0, 21).map((item) => {
                    return <div className="item">{item}</div>;
                  })}
                </div>
              </div>
              <div className="mediaContent-filters-type">
                <p className="mediaContent-filters-type-heading">Status</p>
                <div className="mediaContent-filters-type-list">
                  {categoryList.slice(0, 3).map((item) => {
                    return <div className="item">{item}</div>;
                  })}
                </div>
              </div>
              <div className="mediaContent-filters-type">
                <p className="mediaContent-filters-type-heading">Order By</p>
                <div className="mediaContent-filters-type-list">
                  {categoryList.slice(0, 3).map((item) => {
                    return <div className="item">{item}</div>;
                  })}
                </div>
              </div>
            </div>
            <div className="mediaContent-empty">
              <div className="iconContainer">
                <BsFillPlayFill className="icon" />
              </div>
              <div className="emptySpace"></div>
            </div>
          </div>
          <div className="mediaContent2 show-on-scroll">
            <div className="mediaContent2-profile">
              <div className="mediaContent2-profile-bg"></div>
              <div className="mediaContent2-profile-img">
                {/* <div
                className="img"
                style={{ backgroundImage: `url(${blankUser})` }}
              ></div> */}
              </div>
              <div className="mediaContent2-profile-list">
                <div className="item"></div>
                <div className="item"></div>
                <div className="item"></div>
                <div className="item"></div>
              </div>
              <div className="mediaContent2-profile-chart">
                <div className="circle">
                  <div className="circle-inner"></div>
                </div>
                <div className="labels">
                  <div className="labels-label">
                    <div className="labels-label-color"></div>
                    <div className="labels-label-value"></div>
                  </div>
                  <div className="labels-label">
                    <div className="labels-label-color"></div>
                    <div className="labels-label-value"></div>
                  </div>
                  <div className="labels-label">
                    <div className="labels-label-color"></div>
                    <div className="labels-label-value"></div>
                  </div>
                  <div className="labels-label">
                    <div className="labels-label-color"></div>
                    <div className="labels-label-value"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mediaContent3 show-on-scroll">
            <div className="mediaContent3-novel">
              <div className="mediaContent3-novel-img">
                {/* <div
                className="img"
                style={{ backgroundImage: `url(${blankUser})` }}
              ></div> */}
              </div>
            </div>
            <div className="mediaContent3-desc">
              <div className="mediaContent3-desc-rating">
                <div className="rating">
                  <p className="rating-text">4.5</p>
                  <FaStar className="rating-star" />
                </div>
                <div className="empty"></div>
                <div className="empty"></div>
              </div>
              <div className="mediaContent3-desc-empty"></div>
            </div>
          </div>
          <div className="mediaContent4 show-on-scroll"></div>
        </div>

        <div className="textContent">
          <p className="textContent-large">Feature rich platform</p>
          <p className="textContent-small">
            Explore is a well-organized tool that helps you get the most out of
            LeetCode by providing structure to guide your progress towards the
            next step in your programming career.
          </p>

          <Route
            render={({ history }) => (
              <p
                className="textContent-cta"
                onClick={() => {
                  history.push(`/home`);
                }}
              >
                Get Started {`>`}
              </p>
            )}
          />
        </div>
      </section>

      <div className="landing-item landing-item-features">
        <div className="bg"></div>
        <div className="bg2"></div>
        <div className="bg3"></div>
        <div className="features">
          <div className="features-feature features-filters">
            <div className="iconContainer">
              <div className="iconContainer-circle">
                <ImFilter className="iconContainer-circle-icon" />
              </div>
            </div>
            <div className="heading">Easy to use Filters</div>
            <div className="desc">
              Advanced filters are provided which can be used to display and
              search the novels of your preference.<br></br> You can
              include/exclude specific genres in search, you can view most
              viewed novels of today or all time, you can view latest updated
              novels and do much more.
            </div>
          </div>
          <div className="features-feature  features-collection">
            <div className="iconContainer">
              <div className="iconContainer-circle">
                <BsCollectionFill className="iconContainer-circle-icon" />
              </div>
            </div>
            <div className="heading">Personalized Collection</div>
            <div className="desc">
              You can add any novel to your collection when you are logged in.
              You bookmark any novel for reading it later. If you start reading
              a novel, it automatically gets added to your ongoing section. If
              you complete a novel it will be added to completed section
            </div>
          </div>
          <div className="features-feature  features-notification">
            <div className="iconContainer">
              <div className="iconContainer-circle">
                <IoNotifications className="iconContainer-circle-icon" />
              </div>
            </div>
            <div className="heading">Customized notification</div>
            <div className="desc">
              Once logged in you will be able to receive useful notification.
              You can opt to get notified when a new chapter releases. You will
              also receive notification when someone replies to your comment and
              when a followed user recommends a novel.
            </div>
          </div>
          <div className="features-feature  features-follow">
            <div className="iconContainer">
              <div className="iconContainer-circle">
                <BsPeopleFill className="iconContainer-circle-icon" />
              </div>
            </div>
            <div className="heading">Follow avid Readers</div>
            <div className="desc">
              You can visit fellow user's page and follow them if their read
              list is to your matching. You will be notified when the user
              reviews or recommends a novel.
            </div>
          </div>
          <div className="features-feature  features-custom">
            <div className="iconContainer">
              <div className="iconContainer-circle">
                <CgDarkMode className="iconContainer-circle-icon" />
              </div>
            </div>
            <div className="heading">Customize reading mode</div>
            <div className="desc">
              You can customize the view while you are reading a chapter
              according to your comfort. You can modify text size and you can
              toggle between dark and light theme as well.
            </div>
          </div>
        </div>
      </div>
      <footer className="landing-item-footer">
        <div className="iconContainer">
          <img src={logoMono} alt="" className="iconContainer-icon" />
          {/* <p className="iconContainer-text">
            Novel<br></br>
            <span>Universe</span>
          </p> */}
        </div>
        <div className="copyright">Created by Tanuj Ghosh @2021</div>
      </footer>
    </div>
  );
};
export default Landing;
