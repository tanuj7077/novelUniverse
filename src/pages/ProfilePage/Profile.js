import React, { useState, useEffect } from "react";
import blank from "../../assets/blankProfile.png";
import background from "../../assets/abstract/12.jpg";
import { FaStar } from "react-icons/fa";
import {
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiFillDelete,
} from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { IoMdClose, IoMdAdd } from "react-icons/io";
import { IoAddCircleSharp } from "react-icons/io5";
import { Doughnut } from "react-chartjs-2";
import { following, currentProgress, favGenre } from "../../mockData";
import { useGlobalContext } from "../../context";
import { useParams, useHistory, Route } from "react-router-dom";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/storage";
var config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app(); // if already initialized, use that one
}
var storage = firebase.storage();

const RecommendedModalItems = ({ bookId }) => {
  const [novel, setNovel] = useState();
  const getNovel = async () => {
    await axios.get(`http://localhost:8000/book/${bookId}`).then((res) => {
      setNovel(res.data.data.novel);
    });
  };
  useEffect(() => {
    getNovel();
  }, []);
  return <>{novel && <div className="novel">{novel.name}</div>}</>;
};
const RecommendedItems = ({ bookId }) => {
  const [novel, setNovel] = useState();
  const getNovel = async () => {
    await axios.get(`http://localhost:8000/book/${bookId}`).then((res) => {
      setNovel(res.data.data.novel);
      console.log(res.data.data.novel);
    });
  };
  useEffect(() => {
    getNovel();
  }, [bookId]);
  return (
    <>
      {novel && (
        <div className="recommended-content-novel">
          <div
            className="recommended-content-novel-img"
            style={{ backgroundImage: `url(${novel.imageUrl})` }}
          ></div>
          <div className="recommended-content-novel-body">
            <div className="recommended-content-novel-body-top">
              <Route
                render={({ history }) => (
                  <div
                    className="name"
                    onClick={() => {
                      history.push(`/book/${bookId}`);
                    }}
                  >
                    {novel.name}
                  </div>
                )}
              />
              <div className="rating">
                <FaStar className="icon" />
                <p className="text">{novel.averageRating}</p>
              </div>
            </div>
            <div className="recommended-content-novel-body-info">
              {novel.description.length > 170
                ? novel.description.substring(0, 170) + "..."
                : novel.description}
            </div>
            <div className="recommended-content-novel-body-buttons"></div>
          </div>
        </div>
      )}
    </>
  );
};

const Profile = () => {
  //followers get new recommendations notifications
  const { username } = useParams();
  const {
    userData,
    isLoggedIn,
    getUpdatedUserData,
    toggleLoginModalVisibility,
    changeAlert,
  } = useGlobalContext();

  const [aboutModal, setAboutModal] = useState(false);
  const [usernameModal, setUsernameModal] = useState(false);
  const [profilePicModal, setProfilePicModal] = useState(false);
  const [userProfileData, setUserProfileData] = useState();
  const [recommendedModal, setRecommendedModal] = useState(false);

  const [aboutInput, setAboutInput] = useState("");
  const [userInput, setUserInput] = useState("");

  const [bookImage, setBookImage] = useState("");
  const [toSendProfileImage, setToSendProfileImage] = useState("");
  const [isBookImageUploaded, setIsBookImageUploaded] = useState(false);

  const [followingUsers, setFollowingUsers] = useState([]);
  const [currentProgressData, setCurrentProgressData] = useState([]);
  const [favGenreData, setFavGenreData] = useState();
  const [stats, setStats] = useState();
  const [recommended, setRecommended] = useState([]);
  const [collectionItems, setCollectionItems] = useState([]);
  const [followed, setFollowed] = useState(false);
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
  const updateAbout = async () => {
    await axios
      .post(`http://localhost:8000/user/updateUserProfile/${userData._id}`, {
        about: aboutInput,
      })
      .then((res) => {
        console.log("About Added", res.data);
        setUserProfileData(res.data.userData);
      });
  };
  const updateUserName = async () => {
    await axios
      .post(`http://localhost:8000/user/updateUserProfile/${userData._id}`, {
        userName: userInput,
      })
      .then((res) => {
        console.log("Username changed", res.data);
        if (res.data.message.type === "success") {
          setUserProfileData(res.data.userData);
        } else {
          console.log("username exists");
        }
      });
  };
  const updateProfilePic = async () => {
    let currentImageName = userData._id;
    let uploadImage = storage
      .ref(`profilePic/${currentImageName}`)
      .put(toSendProfileImage);

    uploadImage.on(
      "state-changed",
      (snapshot) => {},
      (error) => {
        alert(error);
      },
      () => {
        console.log("sent to firebase");
        storage
          .ref("profilePic")
          .child(currentImageName)
          .getDownloadURL()
          .then((url) => {
            axios
              .post(
                `http://localhost:8000/user/updateUserProfile/${userData._id}`,
                {
                  userImage: url,
                }
              )
              .then((res) => {
                console.log("sent to server");
                setUserProfileData(res.data.userData);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    );
  };
  const handleImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      setToSendProfileImage(e.target.files[0]);

      reader.onload = (e) => {
        setBookImage(e.target.result);
        setIsBookImageUploaded(true);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  //get profile data (userProfileData)
  const fetchUserData = async (username) => {
    (await username) &&
      (await axios.get(`http://localhost:8000/user/${username}`).then((res) => {
        console.log("fetched User Data");
        console.log(res.data.userData);
        setUserProfileData(res.data.userData);
        fetchFollowing(res.data.userData._id);
        fetchCurrentProgress(res.data.userData._id);
        fetchFavGenre(res.data.userData._id);
        setRecommended(res.data.userData.profileData.recommended);
        getStats(res.data.userData);
        if (res.data.userData && res.data.userData.profileData.about) {
          setAboutInput(res.data.userData.profileData.about);
          setUserInput(res.data.userData.username);
        }
      }));
  };
  const fetchFollowing = async (userId) => {
    await axios
      .get(`http://localhost:8000/user/getFollowing/${userId}`)
      .then((res) => {
        console.log(res.data.data);
        setFollowingUsers(res.data.data);
      });
  };
  //get currentProgress data (currentProgressData)
  const fetchCurrentProgress = async (userId) => {
    await axios
      .get(`http://localhost:8000/user/getCurrentProgress/${userId}`)
      .then((res) => {
        setCurrentProgressData(res.data.data);
      });
  };
  //get FavGenre data (favGenreData)
  const fetchFavGenre = async (userId) => {
    await axios
      .get(`http://localhost:8000/user/getFavGenre/${userId}`)
      .then((res) => {
        let fetchedData = res.data.data;
        let arr = [];
        //converting to array for sorting
        for (let key in fetchedData) {
          arr.push([key, fetchedData[key]]);
        }
        function Comparator(a, b) {
          if (a[1] > b[1]) return -1;
          if (a[1] < b[1]) return 1;
          return 0;
        }
        arr.sort(Comparator);
        arr = arr.slice(0, 6); //top 6 genres
        let labels = [];
        let data = [];
        arr.forEach((item) => {
          labels.push(item[0]);
          data.push(item[1]);
        });
        setFavGenreData({
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: [
                "rgb(117, 255, 154)",
                "rgb(255, 138, 177)",
                "rgb(255, 220, 133",
                "rgb(255, 88, 77)",
                "rgb(138, 165, 255)",
                "rgb(255, 125, 125)",
              ],
              borderWidth: 0,
            },
          ],
        });
      });
  };

  const fetchCollectionItems = async () => {
    userData &&
      (await axios
        .get(`http://localhost:8000/book/getCollectionItems/${userData._id}`)
        .then((res) => {
          let recommendedList = [
            ...res.data.data.completed,
            ...res.data.data.ongoing,
          ];
          setCollectionItems(recommendedList);
        }));
  };
  const getStats = async (userInfo) => {
    await axios
      .get(`http://localhost:8000/user/getUpvotes/${userInfo._id}`)
      .then((res) => {
        let completedCount = 0;
        userInfo.books.forEach((book) => {
          if (book.status === "completed") {
            completedCount++;
          }
        });
        let statsData = {
          comments: userInfo.comments.length,
          reviews: userInfo.reviews.length,
          followers: userInfo.followed.length,
          following: userInfo.following.length,
          upvotes: res.data.data,
          completed: completedCount,
        };
        setStats(statsData);
      });
  };

  const checkFollowed = () => {
    if (userData && userProfileData) {
      let flag = 0;
      userProfileData.followed.forEach((user) => {
        if (user.toString() === userData._id.toString()) {
          flag++;
        }
      });
      flag ? setFollowed(true) : setFollowed(false);
    }
  };

  const follow = async () => {
    if (!isLoggedIn) {
      toggleLoginModalVisibility();
    } else {
      if (followed) {
        let data = {
          toUnFollow: userProfileData._id,
          user: userData._id,
        };
        await axios
          .post(`http://localhost:8000/user/unFollow/`, data)
          .then((res) => {
            changeAlert(res.data.message);
            res.data.message.type === "success" && setFollowed(false);
            fetchUserData();
            //getUpdatedUserData();
          });
      } else {
        let data = {
          toFollow: userProfileData._id,
          user: userData._id,
        };
        await axios
          .post(`http://localhost:8000/user/follow`, data)
          .then((res) => {
            changeAlert(res.data.message);
            res.data.message.type === "success" && setFollowed(true);
            fetchUserData();
            //getUpdatedUserData();
          });
      }
    }
  };

  const addToRecommended = async (bookId) => {
    let data = {
      bookId,
      userId: userProfileData._id,
    };
    await axios
      .post(`http://localhost:8000/user/addToRecommended`, data)
      .then((res) => {
        setRecommended(res.data.data.recommended);
        changeAlert(res.data.message);
      });
  };
  const removeFromRecommended = async (bookId) => {
    let data = {
      bookId,
      userId: userProfileData._id,
    };
    await axios
      .post(`http://localhost:8000/user/removeFromRecommended`, data)
      .then((res) => {
        setRecommended(res.data.data.recommended);
        changeAlert(res.data.message);
      });
  };

  const [usernameExistance, setUsernameExistance] = useState(false);
  const checkUsernameExistance = () => {
    axios
      .get(`http://localhost:8000/user/checkUser/${userInput}`)
      .then((res) => {
        console.log(res.data);
        setUsernameExistance(res.data.usernameExistance);
      });
  };
  useEffect(() => {
    checkUsernameExistance();
  }, [userInput]);

  useEffect(() => {
    fetchUserData(username);
  }, [username]);
  useEffect(() => {
    checkFollowed();
    fetchCollectionItems();
  }, [userData && userProfileData]);
  if (userData && username === userData.username) {
    return (
      <div className="profilePage">
        {/* <div className="profilePage-left">
          <div className="heading">
            <p className="text">Following</p>
            {followingUsers && (
              <p className="count">
                {followingUsers.length > 0 ? followingUsers.length : 0}
              </p>
            )}
          </div>
          <ul className="followingList">
            {followingUsers.map((item) => {
              return (
                <li className="user">
                  <span
                    className="img"
                    style={{
                      backgroundImage: `url(${item.img ? item.img : blank})`,
                    }}
                  ></span>
                  <div className="name">{item.username}</div>
                </li>
              );
            })}
          </ul>
        </div> */}
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
                  backgroundImage: `url(${
                    userProfileData && userProfileData.profilePic
                      ? userProfileData.profilePic
                      : blank
                  })`,
                }}
              >
                {isLoggedIn && (
                  <span
                    className="profileImg-edit"
                    onClick={() => {
                      setProfilePicModal(!profilePicModal);
                    }}
                  >
                    <MdEdit className="profileImg-edit-icon" />
                  </span>
                )}
              </span>
              {userProfileData && (
                <p className="info">
                  <span>{userProfileData.username}</span>
                  <span>
                    <MdEdit
                      className="editIcon"
                      onClick={() => {
                        setUsernameModal(!usernameModal);
                      }}
                    />
                  </span>
                </p>
              )}
              {/* <p className="userName">@Jamie</p> */}
            </div>
            <div className="body">
              <div className="body-item about">
                <div className="body-item-top">
                  <div className="body-item-heading">About Me</div>
                  <MdEdit
                    className="body-item-visibility"
                    onClick={() => {
                      setAboutModal(!aboutModal);
                    }}
                  />
                </div>
                {userProfileData && userProfileData.profileData.about ? (
                  <div className="about-content">
                    {userProfileData.profileData.about}
                  </div>
                ) : (
                  <div className="about-content about-content-null">
                    You have not mentioned anything about yourself
                  </div>
                )}
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
                  {currentProgressData && (
                    <div className="current-content-novels">
                      {currentProgressData.map((item) => {
                        return (
                          <div className="novel">
                            <div className="novel-data">
                              <span className="novel-data-text">
                                <p className="novel-data-name">{item.book}</p>
                                <p className="novel-data-time">
                                  {item.chaptersRead}/{item.totalChapters}
                                </p>
                              </span>
                              <span className="novel-data-progressBar">
                                <span
                                  className="progress"
                                  style={{
                                    width: `${
                                      (item.chaptersRead / item.totalChapters) *
                                      100
                                    }%`,
                                  }}
                                ></span>
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {(!currentProgressData ||
                    currentProgressData.length === 0) && (
                    <div className="current-content-noData">
                      You have not started reading any novel yet
                    </div>
                  )}
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
                {stats && (
                  <div className="stats2-content">
                    <p className="item">
                      <span className="count">{stats.comments}</span>
                      <span className="title">Comments</span>
                    </p>
                    <p className="item">
                      <span className="count">{stats.reviews}</span>
                      <span className="title">Reviews</span>
                    </p>
                    <p className="item">
                      <span className="count">{stats.followers}</span>
                      <span className="title">Followers</span>
                    </p>
                    <p className="item">
                      <span className="count">{stats.upvotes}</span>
                      <span className="title">Upvotes</span>
                    </p>
                    <p className="item">
                      <span className="count">{stats.completed}</span>
                      <span className="title">Completed</span>
                    </p>
                    <p className="item">
                      <span className="count">{stats.following}</span>
                      <span className="title">Following</span>
                    </p>
                  </div>
                )}
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
                {favGenreData && (
                  <div className="favGenre-content">
                    <div className="labels">
                      {favGenreData.labels.map((item, index) => {
                        return (
                          <div className="labels-label">
                            <span
                              className="labels-label-color"
                              style={{
                                backgroundColor: `${favGenreData.datasets[0].backgroundColor[index]}`,
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
                        data={favGenreData}
                        options={{
                          plugins: {
                            legend: {
                              display: false,
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                )}
                {!favGenreData && (
                  <div className="favGenre-noData">
                    You have not started reading any novel yet
                  </div>
                )}
              </div>

              <div className="body-item recommended">
                <div className="body-item-top">
                  <div className="body-item-heading">Recommended</div>
                  {isLoggedIn && (
                    <div className="body-item-icons">
                      {userProfileData &&
                      userProfileData.profileData.recommendedVis ? (
                        <>
                          <IoMdAdd
                            className="body-item-visibility"
                            onClick={() => {
                              setRecommendedModal(!recommendedModal);
                            }}
                          />
                          <AiOutlineEye
                            className="body-item-visibility"
                            onClick={changeRecommendedVisibility}
                          />
                        </>
                      ) : (
                        <>
                          <IoMdAdd
                            className="body-item-visibility"
                            onClick={() => {
                              setRecommendedModal(!recommendedModal);
                            }}
                          />
                          <AiOutlineEyeInvisible
                            className="body-item-visibility"
                            onClick={changeRecommendedVisibility}
                          />
                        </>
                      )}
                    </div>
                  )}
                </div>
                <div className="recommended-content">
                  {recommended.length > 0 ? (
                    <div className="recommended-content-novels">
                      {recommended.map((item) => {
                        return <RecommendedItems bookId={item} />;
                      })}
                    </div>
                  ) : (
                    <div className="recommended-content-noData">
                      You have not added anything in your recommendation
                    </div>
                  )}
                </div>
              </div>
              {followingUsers.length > 0 && (
                <div className="body-item following">
                  <div className="body-item-top">
                    <div className="body-item-heading">Following</div>
                  </div>
                  <div className="following-content">
                    <ul className="following-content-list">
                      {followingUsers.map((item) => {
                        return (
                          <li className="user">
                            <span
                              className="user-img"
                              style={{
                                backgroundImage: `url(${
                                  item.img ? item.img : blank
                                })`,
                              }}
                            ></span>
                            <div className="user-name">{item.username}</div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {aboutModal && (
          <section className="modals">
            <div
              className="modals-backdrop"
              onClick={() => {
                setAboutModal(!aboutModal);
              }}
            ></div>
            <div className="modals-modal">
              <IoMdClose
                className="modals-modal-close"
                onClick={() => {
                  setAboutModal(!aboutModal);
                }}
              />
              <div className="modals-modal-formGrp">
                <label className="modals-modal-formGrp-label">About</label>
                <textarea
                  type="text"
                  onChange={(e) => {
                    setAboutInput(e.target.value);
                  }}
                  value={aboutInput}
                ></textarea>
              </div>
              <div className="modals-modal-formGrp">
                <button
                  className="modals-modal-formGrp-btn"
                  onClick={updateAbout}
                >
                  Submit
                </button>
              </div>
            </div>
          </section>
        )}
        {usernameModal && (
          <section className="modals">
            <div
              className="modals-backdrop"
              onClick={() => {
                setUsernameModal(!usernameModal);
              }}
            ></div>
            <div className="modals-modal">
              <IoMdClose
                className="modals-modal-close"
                onClick={() => {
                  setUsernameModal(!usernameModal);
                }}
              />
              <div className="modals-modal-formGrp">
                <label className="modals-modal-formGrp-label">Username</label>
                <input
                  type="text"
                  className="modals-modal-formGrp-text"
                  value={userInput}
                  onChange={(e) => {
                    setUserInput(e.target.value);
                  }}
                />
                {usernameExistance && (
                  <p className="modals-modal-formGrp-err">
                    username already exists
                  </p>
                )}
                {!usernameExistance && userInput.length > 0 && (
                  <p className="modals-modal-formGrp-success">
                    username available
                  </p>
                )}
              </div>
              <div className="modals-modal-formGrp">
                {!(usernameExistance || userInput.length === 0) && (
                  <button
                    className="modals-modal-formGrp-btn"
                    onClick={updateUserName}
                  >
                    Submit
                  </button>
                )}
                {(usernameExistance || userInput.length === 0) && (
                  <button className="modals-modal-formGrp-btn modals-modal-formGrp-btn-disabled">
                    Submit
                  </button>
                )}
              </div>
            </div>
          </section>
        )}
        {profilePicModal && (
          <section className="modals">
            <div
              className="modals-backdrop"
              onClick={() => {
                setProfilePicModal(!profilePicModal);
              }}
            ></div>
            <div className="modals-modal">
              <IoMdClose
                className="modals-modal-close"
                onClick={() => {
                  setProfilePicModal(!profilePicModal);
                }}
              />
              <div className="modals-modal-formGrp">
                <label>Change profile picture</label>
                <input
                  id="fileInput"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleImage}
                />
                {isBookImageUploaded && (
                  <div
                    className="modals-modal-formGrp-uploadedImg"
                    style={{ backgroundImage: `url(${bookImage})` }}
                  ></div>
                )}
              </div>
              <div className="modals-modal-formGrp">
                {isBookImageUploaded ? (
                  <button
                    className="modals-modal-formGrp-btn"
                    onClick={updateProfilePic}
                  >
                    Submit
                  </button>
                ) : (
                  <button className="modals-modal-formGrp-btn modals-modal-formGrp-btn-disabled">
                    Submit
                  </button>
                )}
              </div>
            </div>
          </section>
        )}
        {recommendedModal && (
          <section className="modals">
            <div
              className="modals-backdrop"
              onClick={() => {
                setRecommendedModal(!recommendedModal);
              }}
            ></div>
            <div className="modals-modal">
              <IoMdClose
                className="modals-modal-close"
                onClick={() => {
                  setRecommendedModal(!recommendedModal);
                }}
              />
              <p className="modals-modal-heading">Add to Recommendations</p>
              <ul className="modals-modal-list">
                {collectionItems &&
                  collectionItems.map((item) => {
                    return (
                      <li className="modals-modal-list-item">
                        {!recommended.includes(item) ? (
                          <IoAddCircleSharp
                            className="icon icon-add"
                            onClick={() => {
                              addToRecommended(item);
                            }}
                          />
                        ) : (
                          <AiFillDelete
                            className="icon icon-delete"
                            onClick={() => {
                              removeFromRecommended(item);
                            }}
                          />
                        )}
                        <RecommendedModalItems bookId={item} />
                      </li>
                    );
                  })}
              </ul>
            </div>
          </section>
        )}
      </div>
    );
  } else {
    return (
      <div className="profilePage">
        {/* <div className="profilePage-left">
          <div className="heading">
            <p className="text">Following</p>
            {followingUsers && (
              <p className="count">
                {followingUsers.length > 0 ? followingUsers.length : 0}
              </p>
            )}
          </div>
          <ul className="followingList">
            {followingUsers.map((item) => {
              return (
                <li className="user">
                  <span
                    className="img"
                    style={{
                      backgroundImage: `url(${item.img ? item.img : blank})`,
                    }}
                  ></span>
                  <div className="name">{item.username}</div>
                </li>
              );
            })}
          </ul>
        </div>
         */}
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
                  backgroundImage: `url(${
                    userProfileData && userProfileData.profilePic
                      ? userProfileData.profilePic
                      : blank
                  })`,
                }}
              ></span>
              {userProfileData && (
                <p className="info">
                  <span>{userProfileData.username}</span>
                </p>
              )}
              {followed ? (
                <p className="follow" onClick={follow}>
                  Followed
                </p>
              ) : (
                <p className="follow" onClick={follow}>
                  Follow
                </p>
              )}
            </div>
            <div className="body">
              <div className="body-item about">
                <div className="body-item-top">
                  <div className="body-item-heading">About Me</div>
                </div>
                {userProfileData && userProfileData.profileData.about ? (
                  <div className="about-content">
                    {userProfileData.profileData.about}
                  </div>
                ) : (
                  <div className="about-content about-content-null">
                    User has not written anything about himself
                  </div>
                )}
              </div>

              {userProfileData &&
                userProfileData.profileData.currentProgressVis && (
                  <div className="body-item current">
                    <div className="body-item-top">
                      <div className="body-item-heading">Current Progress</div>
                    </div>
                    <div className="current-content">
                      {currentProgressData && (
                        <div className="current-content-novels">
                          {currentProgressData.map((item) => {
                            return (
                              <div className="novel">
                                <div className="novel-data">
                                  <span className="novel-data-text">
                                    <p className="novel-data-name">
                                      {item.book}
                                    </p>
                                    <p className="novel-data-time">
                                      {item.chaptersRead}/{item.totalChapters}
                                    </p>
                                  </span>
                                  <span className="novel-data-progressBar">
                                    <span
                                      className="progress"
                                      style={{
                                        width: `${
                                          (item.chaptersRead /
                                            item.totalChapters) *
                                          100
                                        }%`,
                                      }}
                                    ></span>
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {(!currentProgressData ||
                        currentProgressData.length === 0) && (
                        <div className="current-content-noData">
                          User has not started reading any novel yet
                        </div>
                      )}
                    </div>
                  </div>
                )}

              {userProfileData && userProfileData.profileData.statsVis && (
                <div className="body-item stats2">
                  <div className="body-item-top">
                    <div className="body-item-heading">Stats</div>
                  </div>
                  {stats && (
                    <div className="stats2-content">
                      <p className="item">
                        <span className="count">{stats.comments}</span>
                        <span className="title">Comments</span>
                      </p>
                      <p className="item">
                        <span className="count">{stats.reviews}</span>
                        <span className="title">Reviews</span>
                      </p>
                      <p className="item">
                        <span className="count">{stats.followers}</span>
                        <span className="title">Followers</span>
                      </p>
                      <p className="item">
                        <span className="count">{stats.upvotes}</span>
                        <span className="title">Upvotes</span>
                      </p>
                      <p className="item">
                        <span className="count">{stats.completed}</span>
                        <span className="title">Completed</span>
                      </p>
                      <p className="item">
                        <span className="count">{stats.following}</span>
                        <span className="title">Following</span>
                      </p>
                    </div>
                  )}
                </div>
              )}

              {userProfileData && userProfileData.profileData.favGenreVis && (
                <div className="body-item favGenre">
                  <div className="body-item-top">
                    <div className="body-item-heading">Favourite Genre</div>
                  </div>
                  {favGenreData && (
                    <div className="favGenre-content">
                      <div className="labels">
                        {favGenreData.labels.map((item, index) => {
                          return (
                            <div className="labels-label">
                              <span
                                className="labels-label-color"
                                style={{
                                  backgroundColor: `${favGenreData.datasets[0].backgroundColor[index]}`,
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
                          data={favGenreData}
                          options={{
                            plugins: {
                              legend: {
                                display: false,
                              },
                            },
                          }}
                        />
                      </div>
                    </div>
                  )}
                  {!favGenreData && (
                    <div className="favGenre-noData">
                      User has not started reading any novel yet
                    </div>
                  )}
                </div>
              )}

              {userProfileData && userProfileData.profileData.recommendedVis && (
                <div className="body-item recommended">
                  <div className="body-item-top">
                    <div className="body-item-heading">Recommended</div>
                  </div>
                  <div className="recommended-content">
                    {recommended.length > 0 ? (
                      <div className="recommended-content-novels">
                        {recommended.map((item) => {
                          return <RecommendedItems bookId={item} />;
                        })}
                      </div>
                    ) : (
                      <div className="recommended-content-noData">
                        User has not added any novels in recommendations yet
                      </div>
                    )}
                  </div>
                </div>
              )}
              {followingUsers.length > 0 && (
                <div className="body-item following">
                  <div className="body-item-top">
                    <div className="body-item-heading">Following</div>
                  </div>
                  <div className="following-content">
                    <ul className="following-content-list">
                      {followingUsers.map((item) => {
                        return (
                          <li className="user">
                            <span
                              className="user-img"
                              style={{
                                backgroundImage: `url(${
                                  item.img ? item.img : blank
                                })`,
                              }}
                            ></span>
                            <div className="user-name">{item.username}</div>
                          </li>
                        );
                      })}
                    </ul>
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
