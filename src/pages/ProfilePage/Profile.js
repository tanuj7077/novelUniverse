import React, { useState, useEffect } from "react";
import blank from "../../assets/blankProfile.png";
import background from "../../assets/abstract/12.jpg";
import { FaCentercode, FaStar } from "react-icons/fa";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { Doughnut } from "react-chartjs-2";
import { following, currentProgress, favGenre } from "../../mockData";
import { useGlobalContext } from "../../context";
import { useParams } from "react-router-dom";
import axios from "axios";
const Profile = () => {
  //followers get new recommendations notifications
  const { username } = useParams();
  const { userData, isLoggedIn, getUpdatedUserData } = useGlobalContext();
  const profileDataStructure = {
    userName: "",
    userImage: "",
    about: "",
    currentVisibility: false,
    statsVisibility: false,
    favGenreVisibility: false,
    recommendedVisibility: false,
  };
  const [userProfileData, setUserProfileData] = useState();
  const changeCurrentVisibility = async () => {
    await axios
      .post(`http://localhost:8000/user/updateUserProfile/${userData._id}`, {
        currentVisibility: true,
      })
      .then((res) => {
        console.log(
          "Toggle Current Progress",
          res.data.userData.profileData.currentProgressVis
        );
        setUserProfileData(res.data.userData);
      });
  };
  const changeStatsVisibility = async () => {
    await axios
      .post(`http://localhost:8000/user/updateUserProfile/${userData._id}`, {
        statsVisibility: true,
      })
      .then((res) => {
        console.log("Toggle Stats", res.data.userData.profileData.statsVis);

        setUserProfileData(res.data.userData);
      });
  };
  const changeFavGenreVisibility = async () => {
    await axios
      .post(`http://localhost:8000/user/updateUserProfile/${userData._id}`, {
        favGenreVisibility: true,
      })
      .then((res) => {
        console.log(
          "Toggle FavGenre",
          res.data.userData.profileData.favGenreVis
        );

        setUserProfileData(res.data.userData);
      });
  };
  const changeRecommendedVisibility = async () => {
    await axios
      .post(`http://localhost:8000/user/updateUserProfile/${userData._id}`, {
        recommendedVisibility: true,
      })
      .then((res) => {
        console.log(
          "Toggle Recommended",
          res.data.userData.profileData.recommendedVis
        );

        setUserProfileData(res.data.userData);
      });
  };
  const fetchUserData = async (username) => {
    await axios.get(`http://localhost:8000/user/${username}`).then((res) => {
      console.log("fetched User Data");
      setUserProfileData(res.data.userData);
    });
  };
  useEffect(() => {
    fetchUserData(username);
  }, []);
  if (userData && username === userData.username) {
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
                </div>
                <div className="about-content">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
              </div>
              <div className="body-item current">
                <div className="body-item-top">
                  <div className="body-item-heading">Current Progress</div>
                  {isLoggedIn && (
                    <>
                      {userProfileData &&
                      userProfileData.profileData.currentProgressVis ? (
                        <AiOutlineEye
                          className="body-item-visibility"
                          onClick={changeCurrentVisibility}
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          className="body-item-visibility"
                          onClick={changeCurrentVisibility}
                        />
                      )}
                    </>
                  )}
                </div>
                <div className="current-content">
                  <div className="current-content-novels">
                    {currentProgress &&
                      currentProgress.map((item) => {
                        return (
                          <div className="novel">
                            {/* <img src={item.img} alt="" className="novel-img" /> */}
                            {/* <span className="novel-img"></span> */}
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
              <div className="body-item stats2">
                <div className="body-item-top">
                  <div className="body-item-heading">Stats</div>
                  {isLoggedIn && (
                    <>
                      {userProfileData &&
                      userProfileData.profileData.statsVis ? (
                        <AiOutlineEye
                          className="body-item-visibility"
                          onClick={changeStatsVisibility}
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          className="body-item-visibility"
                          onClick={changeStatsVisibility}
                        />
                      )}
                    </>
                  )}
                </div>
                <div className="stats2-content">
                  <p className="item">
                    <span className="count">120</span>
                    <span className="title">Comments</span>
                  </p>
                  <p className="item">
                    <span className="count">12</span>
                    <span className="title">Reviews</span>
                  </p>
                  <p className="item">
                    <span className="count">4.5k</span>
                    <span className="title">Followers</span>
                  </p>
                  <p className="item">
                    <span className="count">5.5k</span>
                    <span className="title">Upvotes</span>
                  </p>
                  <p className="item">
                    <span className="count">31</span>
                    <span className="title">Completed</span>
                  </p>
                  <p className="item">
                    <span className="count">12</span>
                    <span className="title">Following</span>
                  </p>
                </div>
              </div>

              <div className="body-item favGenre">
                <div className="body-item-top">
                  <div className="body-item-heading">Favourite Genre</div>
                  {isLoggedIn && (
                    <>
                      {userProfileData &&
                      userProfileData.profileData.favGenreVis ? (
                        <AiOutlineEye
                          className="body-item-visibility"
                          onClick={changeFavGenreVisibility}
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          className="body-item-visibility"
                          onClick={changeFavGenreVisibility}
                        />
                      )}
                    </>
                  )}
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
                  {isLoggedIn && (
                    <>
                      {userProfileData &&
                      userProfileData.profileData.recommendedVis ? (
                        <AiOutlineEye
                          className="body-item-visibility"
                          onClick={changeRecommendedVisibility}
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          className="body-item-visibility"
                          onClick={changeRecommendedVisibility}
                        />
                      )}
                    </>
                  )}
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
  } else {
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
                </div>
                <div className="about-content">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
              </div>
              {userProfileData &&
                userProfileData.profileData.currentProgressVis && (
                  <div className="body-item current">
                    <div className="body-item-top">
                      <div className="body-item-heading">Current Progress</div>
                    </div>
                    <div className="current-content">
                      <div className="current-content-novels">
                        {currentProgress &&
                          currentProgress.map((item) => {
                            return (
                              <div className="novel">
                                {/* <img src={item.img} alt="" className="novel-img" /> */}
                                {/* <span className="novel-img"></span> */}
                                <div className="novel-data">
                                  <span className="novel-data-text">
                                    <p className="novel-data-name">
                                      {item.name}
                                    </p>
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
                )}
              {userProfileData && userProfileData.profileData.statsVis && (
                <div className="body-item stats2">
                  <div className="body-item-top">
                    <div className="body-item-heading">Stats</div>
                  </div>
                  <div className="stats2-content">
                    <p className="item">
                      <span className="count">120</span>
                      <span className="title">Comments</span>
                    </p>
                    <p className="item">
                      <span className="count">12</span>
                      <span className="title">Reviews</span>
                    </p>
                    <p className="item">
                      <span className="count">4.5k</span>
                      <span className="title">Followers</span>
                    </p>
                    <p className="item">
                      <span className="count">5.5k</span>
                      <span className="title">Upvotes</span>
                    </p>
                    <p className="item">
                      <span className="count">31</span>
                      <span className="title">Completed</span>
                    </p>
                    <p className="item">
                      <span className="count">12</span>
                      <span className="title">Following</span>
                    </p>
                  </div>
                </div>
              )}
              {userProfileData && userProfileData.profileData.favGenreVis && (
                <div className="body-item favGenre">
                  <div className="body-item-top">
                    <div className="body-item-heading">Favourite Genre</div>
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
              )}
              {userProfileData && userProfileData.profileData.recommendedVis && (
                <div className="body-item favourites">
                  <div className="body-item-top">
                    <div className="body-item-heading">Recommended</div>
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
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default Profile;
