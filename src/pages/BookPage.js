import React, { useState, useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";
import Summary from "./BookPage/Summary";
import Reviews from "./BookPage/Reviews";
import bg1 from "../assets/bg-3.jpg";
import useOnScreen from "../components/Utilities/useOnScreen";
import axios from "axios";
import ChapterSection from "./BookPage/ChapterSection";
import { useGlobalContext } from "../context";
import { useParams, useHistory } from "react-router-dom";

const BookPage = () => {
  const { userData, isLoggedIn, getUpdatedUserData, changeAlert, addToViews } =
    useGlobalContext();

  const history = useHistory();
  const introRef = useRef();
  const introVisible = useOnScreen(introRef);
  const { bookId } = useParams();
  const [novelData, setNovelData] = useState();
  const [averageRating, setAverageRating] = useState(0);
  const [bookmarked, setBookmarked] = useState();
  const [recommendBtnVisibility, setRecommendBtnVisibility] = useState(false);
  const [recommended, setRecommended] = useState(false);
  const fetchBookData = (id) => {
    axios.get(`http://localhost:8000/book/${id}`).then((res) => {
      setNovelData(res.data.data.novel);
      console.log(res.data.data.novel);
      calculateAverageRating(res.data.data.novel);
    });
  };
  useEffect(() => {
    fetchBookData(bookId);
  }, []);
  let novelObj = {
    img: "https://mangageko.com/media/manga_covers/cover_1_DrJkaWz.jpg",
    title: "Reincarnation of the Strongest Swordsman in Universe",
    author: "Kim Yohan",
    chapters: 145,
    status: "Completed",
    bookmarked: 1200,
    rank: 1,
    rating: {
      rating: 4.5,
      ratedBy: 1200,
    },
    tags: ["Psychology", "Action", "Horror", "Tragedy"],
    readStatus: "Start",
    desc: "U Ijin was the sole survivor of a plane crash when he was little. After becoming a mercenary to survive for 10 years, he returns to his family in his hometown.",
  };
  const calculateAverageRating = (novel) => {
    let total = 0;
    let ratingTotal = 0;
    if (novel) {
      for (let k in novel.rating) {
        total += novel.rating[k];
        ratingTotal += parseInt(k) * novel.rating[k];
      }
    }
    if (total === 0) {
      setAverageRating(0);
    } else {
      let averageRating = Math.round((ratingTotal / total) * 10) / 10;
      setAverageRating(averageRating);
    }
  };
  const bookmark = async () => {
    isLoggedIn &&
      (await axios
        .post(`http://localhost:8000/book/bookmark/${bookId}`, {
          userId: userData._id,
        })
        .then((res) => {
          changeAlert(res.data.message);
          fetchBookData(bookId);
          getUpdatedUserData();
          checkBookmarked();
        }));
  };
  const start = () => {
    history.push(`../chapter/${novelData.chapters[0].id}`);
  };
  const checkBookmarked = () => {
    let c = 0;
    userData &&
      userData.books &&
      userData.books.forEach((item) => {
        if (item.book === bookId && item.bookmarked) {
          c++;
        }
      });
    if (c) {
      setBookmarked(true);
    } else {
      setBookmarked(false);
    }
  };
  const checkCompleted = () => {
    let c = 0;
    userData &&
      userData.books &&
      userData.books.forEach((item) => {
        if (item.book === bookId && item.status === "completed") {
          c++;
        }
      });
    if (c > 0) {
      setRecommendBtnVisibility(true);
      checkRecommended();
    }
  };
  const checkRecommended = () => {
    let c = 0;
    userData &&
      userData.profileData &&
      userData.profileData.recommended &&
      userData.profileData.recommended.forEach((item) => {
        if (item === bookId) {
          c++;
        }
      });
    if (c > 0) {
      setRecommended(true);
    }
  };
  useEffect(() => {
    checkBookmarked();
    checkCompleted();
  }, []);
  useEffect(() => {
    addToViews(bookId);
  }, [bookId]);
  return (
    <div className="bookPage">
      <div className="bookPage-container">
        <div className="introSection" ref={introRef}>
          <span
            className="introSection-bgImg"
            style={{
              backgroundImage: `url(${bg1})`,
            }}
          ></span>
          {novelData && (
            <div className="introSection-container">
              <span
                className="introSection-container-img"
                style={{
                  backgroundImage: `url(${novelData.imageUrl})`,
                }}
              ></span>
              <div className="introSection-container-content">
                <div className="introSection-container-content-titleSection">
                  <p className="name">
                    <span className="novelName">{novelData.name}</span>
                    <span className="authorName">{novelData.author}</span>
                  </p>
                  <div className="ratingSection">
                    <div className="rating">{averageRating}</div>
                    <FaStar className="icon" />
                  </div>
                </div>

                <div className="introSection-container-content-midSection">
                  <div className="introSection-container-content-infoSectionCard">
                    <div className="subheading">Stats</div>
                    <div className="introSection-container-content-infoSection">
                      <div className="introSection-container-content-infoSection-item">
                        <div className="count">{novelData.chapters.length}</div>
                        <div className="subheading">Chapter</div>
                      </div>
                      <div className="introSection-container-content-infoSection-item">
                        <div className="count">{novelObj.rank}</div>
                        <div className="subheading">Rank</div>
                      </div>
                      {/* <div className="introSection-container-content-infoSection-item">
                    <div className="subheading">Status</div>
                    <div className="count">{novelObj.status}</div>
                  </div> */}
                      <div className="introSection-container-content-infoSection-item">
                        <div className="count">{novelData.bookmarked}</div>
                        <div className="subheading">Bookmarked</div>
                      </div>
                    </div>
                  </div>
                  <div className="introSection-container-content-otherSectionCard">
                    <div className="subheading">Categories</div>
                    <div className="introSection-container-content-categorySection">
                      {/* <div className="subheading">Categories</div> */}
                      <div className="tags">
                        {novelData.categories.map((tag) => {
                          return <p className="tags-tag">{tag}</p>;
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="introSection-container-content-buttons">
                  <div className="start btn" onClick={start}>
                    <span className="text">{novelObj.readStatus}</span>
                  </div>
                  <div className="add btn">
                    {bookmarked ? (
                      <span className="text">Bookmarked</span>
                    ) : (
                      <span className="text" onClick={bookmark}>
                        Bookmark
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {!novelData && (
            <div className="introSection-container introSection-container-loading">
              <span className="introSection-container-img"></span>
              <div className="introSection-container-content">
                <div className="introSection-container-content-titleSection">
                  <p className="name">
                    <span className="novelName">Loading name</span>
                    <span className="authorName">Loading author</span>
                  </p>
                  <div className="ratingSection">
                    <FaStar className="icon" />
                  </div>
                </div>

                <div className="introSection-container-content-midSection">
                  <div className="introSection-container-content-infoSectionCard">
                    <div className="subheading">Stats</div>
                    <div className="introSection-container-content-infoSection">
                      <div className="introSection-container-content-infoSection-item">
                        <div className="count">0</div>
                        <div className="subheading">Chapter</div>
                      </div>
                      <div className="introSection-container-content-infoSection-item">
                        <div className="count">0</div>
                        <div className="subheading">Rank</div>
                      </div>
                      <div className="introSection-container-content-infoSection-item">
                        <div className="count">0</div>
                        <div className="subheading">Bookmarked</div>
                      </div>
                    </div>
                  </div>
                  <div className="introSection-container-content-otherSectionCard">
                    <div className="subheading">Categories</div>
                    <div className="introSection-container-content-categorySection">
                      <div className="tags"></div>
                    </div>
                  </div>
                </div>

                <div className="introSection-container-content-buttons">
                  <div className="start btn">
                    <span className="text">--</span>
                  </div>
                  <div className="add btn">
                    <span className="text">--</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {novelData && (
            <div className="introSection-containerSmall">
              <span
                className="introSection-containerSmall-img"
                style={{
                  backgroundImage: `url(${novelData.imageUrl})`,
                }}
              ></span>
              <div className="introSection-containerSmall-content">
                <section className="introSection-containerSmall-content-titleSection">
                  <p className="name">
                    <span className="novelName">{novelData.name}</span>
                    <span className="authorName">{novelData.author}</span>
                  </p>
                  <div className="ratingSection">
                    <div className="rating">{averageRating}</div>
                    <FaStar className="icon" />
                  </div>
                </section>
                <section className="introSection-containerSmall-content-midSection">
                  <div className="statSection">
                    <p className="statSection-heading">Stats</p>
                    <div className="statSection-items">
                      <div className="statSection-items-item">
                        <div className="statSection-items-item-count">
                          {novelData.chapters.length}
                        </div>
                        <div className="statSection-items-item-subheading">
                          Chapter
                        </div>
                      </div>
                      <div className="statSection-items-item">
                        <div className="statSection-items-item-count">
                          {novelObj.rank}
                        </div>
                        <div className="statSection-items-item-subheading">
                          Rank
                        </div>
                      </div>
                      <div className="statSection-items-item">
                        <div className="statSection-items-item-count">
                          {novelData.bookmarked}
                        </div>
                        <div className="statSection-items-item-subheading">
                          Bookmarked
                        </div>
                      </div>
                      <div className="statSection-items-item">
                        <div className="statSection-items-item-count">
                          {novelData.status}
                        </div>
                        <div className="statSection-items-item-subheading">
                          Status
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="categorySection">
                    <p className="categorySection-heading">Categories</p>
                    <div className="categorySection-tags">
                      {novelData.categories.map((tag) => {
                        return (
                          <p className="categorySection-tags-tag">{tag}</p>
                        );
                      })}
                    </div>
                  </div>
                </section>
                <section className="introSection-containerSmall-content-buttons">
                  <button className="btn" onClick={start}>
                    Start
                  </button>

                  {bookmarked ? (
                    <button className="btn">Bookmarked</button>
                  ) : (
                    <button className="btn" onClick={bookmark}>
                      Bookmark
                    </button>
                  )}
                </section>
              </div>
            </div>
          )}
          {!novelData && (
            <div className="introSection-containerSmall">
              <span
                className="introSection-containerSmall-img"
                style={{
                  backgroundImage: `url(${bg1})`,
                }}
              ></span>
              <div className="introSection-containerSmall-content">
                <section className="introSection-containerSmall-content-titleSection">
                  <p className="name">
                    <span className="novelName">Loading name</span>
                    <span className="authorName">Loading author</span>
                  </p>
                  <div className="ratingSection">
                    <FaStar className="icon" />
                  </div>
                </section>
                <section className="introSection-containerSmall-content-midSection">
                  <div className="statSection">
                    <p className="statSection-heading">Stats</p>
                    <div className="statSection-items">
                      <div className="statSection-items-item">
                        <div className="statSection-items-item-count">0</div>
                        <div className="statSection-items-item-subheading">
                          Chapter
                        </div>
                      </div>
                      <div className="statSection-items-item">
                        <div className="statSection-items-item-count">0</div>
                        <div className="statSection-items-item-subheading">
                          Rank
                        </div>
                      </div>
                      <div className="statSection-items-item">
                        <div className="statSection-items-item-count">0</div>
                        <div className="statSection-items-item-subheading">
                          Bookmarked
                        </div>
                      </div>
                      <div className="statSection-items-item">
                        <div className="statSection-items-item-count">
                          Loading
                        </div>
                        <div className="statSection-items-item-subheading">
                          Status
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="categorySection">
                    <p className="categorySection-heading">Categories</p>
                    <div className="categorySection-tags">
                      <p className="categorySection-tags-tag">--</p>
                    </div>
                  </div>
                </section>
                <section className="introSection-containerSmall-content-buttons">
                  <button className="btn">--</button>

                  <button className="btn">--</button>
                </section>
              </div>
            </div>
          )}
        </div>
        <div
          className={`contentSection ${
            !introVisible ? "contentSection-alignRight" : ""
          }`}
        >
          {novelData ? (
            <Summary content={novelData.description} />
          ) : (
            <Summary loading={true} />
          )}
          {novelData && novelData.chapters && (
            <ChapterSection Chapters={novelData.chapters} />
          )}
          {/* {novelData && novelData.chapters && (
            <Chapters allChapters={allChapters} Chapters={novelData.chapters} />
          )} */}
          {novelData && <Reviews book={novelData} />}
        </div>
        <section className="recommendedSection"></section>
      </div>
    </div>
  );
};
export default BookPage;
