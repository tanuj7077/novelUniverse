import React from "react";
import blank from "../../assets/blankProfile.png";
import background from "../../assets/digital.jpg";
import { FaCentercode, FaStar } from "react-icons/fa";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { Doughnut } from "react-chartjs-2";
import { following, currentProgress, favGenre } from "../../mockData";
const Profile = () => {
  return (
    <div className="profilePage">
      <div className="profilePage-left">
        <div className="heading">
          <p className="text">Following</p>
          <p className="count">50</p>
        </div>
        <ul className="followingList">
          {following.map((item) => {
            return (
              <li className="user">
                <span
                  className="img"
                  style={{
                    backgroundImage: `url(${blank})`,
                  }}
                ></span>
                <div className="name">{item}</div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="profilePage-right">
        <div className="contents">
          <div className="top">
            <span
              className="bg"
              style={{
                backgroundImage: `url(${background})`,
              }}
            ></span>
            <span
              className="profileImg"
              style={{
                backgroundImage: `url(${blank})`,
              }}
            ></span>
            <p className="name">
              <span>James Cameron</span>
              <span>
                <MdEdit className="editIcon" />
              </span>
            </p>
            <p className="userName">@Jamie</p>
          </div>
          <div className="body">
            <div className="body-item about">
              <div className="body-item-top">
                <div className="body-item-heading">About Me</div>
                <AiOutlineEye className="body-item-visibility" />
              </div>
              <div className="about-content">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </div>
            </div>
            <div className="body-item current">
              <div className="body-item-top">
                <div className="body-item-heading">Current Progress</div>
                <AiOutlineEye className="body-item-visibility" />
              </div>
              <div className="current-content">
                <div className="current-content-novels">
                  {currentProgress &&
                    currentProgress.map((item) => {
                      return (
                        <div className="novel">
                          {/* <img src={item.img} alt="" className="novel-img" /> */}
                          <span className="novel-img"></span>
                          <div className="novel-data">
                            <span className="novel-data-text">
                              <p className="novel-data-name">{item.name}</p>
                              <p className="novel-data-time">14h</p>
                            </span>
                            <span className="novel-data-progressBar">
                              <span
                                className="progress"
                                style={{
                                  left: `${item.progress * 100 - 100}%`,
                                }}
                              ></span>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="body-item stats">
              <div className="body-item-top">
                <div className="body-item-heading">Stats</div>
                <AiOutlineEye className="body-item-visibility" />
              </div>
              <div className="stats-content">
                <p className="item">
                  <FaCentercode className="icon" />
                  <p className="text">
                    <span className="title">Comments</span>
                    <span className="count">12</span>
                  </p>
                </p>
                <p className="item">
                  <FaCentercode className="icon" />
                  <p className="text">
                    <span className="title">Reviews</span>
                    <span className="count">12</span>
                  </p>
                </p>
                <p className="item">
                  <FaCentercode className="icon" />
                  <p className="text">
                    <span className="title">Followers</span>
                    <span className="count">12</span>
                  </p>
                </p>
                <p className="item">
                  <FaCentercode className="icon" />
                  <p className="text">
                    <span className="title">Upvotes</span>
                    <span className="count">12</span>
                  </p>
                </p>
                <p className="item">
                  <FaCentercode className="icon" />
                  <p className="text">
                    <span className="title">Completed</span>
                    <span className="count">12</span>
                  </p>
                </p>
                <p className="item">
                  <FaCentercode className="icon" />
                  <p className="text">
                    <span className="title">Upvotes</span>
                    <span className="count">12</span>
                  </p>
                </p>
              </div>
            </div>
            <div className="body-item favGenre">
              <div className="body-item-top">
                <div className="body-item-heading">Favourite Genre</div>
                <AiOutlineEye className="body-item-visibility" />
              </div>
              <div className="favGenre-content">
                <div className="labels">
                  {favGenre.labels.map((item, index) => {
                    return (
                      <div className="labels-label">
                        <span
                          className="labels-label-color"
                          style={{
                            backgroundColor: `${favGenre.datasets[0].backgroundColor[index]}`,
                          }}
                        ></span>
                        <p className="labels-label-text">{item}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="doughnutChart">
                  <Doughnut
                    className="doughnut"
                    data={favGenre}
                    options={{
                      plugins: {
                        legend: {
                          display: false,
                          labels: {
                            color: "rgb(255, 99, 132)",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="body-item favourites">
              <div className="body-item-top">
                <div className="body-item-heading">Recommended</div>
                <AiOutlineEye className="body-item-visibility" />
              </div>
              <div className="favourites-content">
                <div className="favourites-content-novels">
                  {currentProgress.map((item) => {
                    return (
                      <div className="favourites-content-novel">
                        <div className="favourites-content-novel-img"></div>
                        <div className="text">
                          <div className="favourites-content-novel-name">
                            {item.name}
                          </div>
                          <div className="favourites-content-novel-rating">
                            <FaStar className="icon" />
                            <p className="text">{item.rating}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
