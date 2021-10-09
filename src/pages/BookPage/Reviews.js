import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { useGlobalContext } from "../../context";
import Review from "../../components/Review/Review";

function Reviews({ book }) {
  const { userData, isLoggedIn, getUpdatedUserData, changeAlert } =
    useGlobalContext();
  const REVIEWS_LIMIT = 8;

  const [hoveredStar, setHoveredStar] = useState(0);
  const [rated, setRated] = useState(0);

  const [givenReviewTitle, setGivenReviewTitle] = useState("");
  const [givenReviewDesc, setGivenReviewDesc] = useState("");

  const [reviewTitleInput, setReviewTitleInput] = useState("");
  const [reviewInput, setReviewInput] = useState("");
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [ratings, setRatings] = useState();
  const [totalRatings, setTotalRatings] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [givenReview, setGivenReview] = useState();

  const addReview = () => {
    const Review = {
      title: reviewTitleInput,
      description: reviewInput,
      user: userData._id,
      book: book._id,
    };
    axios.post("http://localhost:8000/review/addReview", Review).then((res) => {
      getReviews();
    });
  };
  const editReview = () => {
    const Review = {
      title: givenReviewTitle,
      description: givenReviewDesc,
      reviewId: givenReview._id,
    };
    axios
      .post("http://localhost:8000/review/editReview", Review)
      .then((res) => {
        getReviews();
        changeAlert(res.data.message);
      });
  };

  const checkRatingGiven = () => {
    let c = 0;
    userData &&
      userData.books &&
      userData.books.forEach((item) => {
        if (item.book === book._id && item.rating > 0) {
          c++;
        }
      });
    if (c) {
      return true;
    }
    return false;
  };
  const addRating = (rate) => {
    if (isLoggedIn) {
      let data = {
        rating: rate,
        userId: userData._id,
        bookId: book._id,
      };
      if (checkRatingGiven()) {
        axios
          .post("http://localhost:8000/review/editRating", data)
          .then((res) => {
            changeAlert(res.data.message);
            setRated(rate);
            getUpdatedUserData();
          });
      } else {
        axios
          .post("http://localhost:8000/review/addRating", data)
          .then((res) => {
            changeAlert(res.data.message);
            setRated(rate);
            getUpdatedUserData();
          });
      }
    } else {
      changeAlert({
        type: "error",
        messages: ["You need to login first"],
      });
    }
  };

  const getReviews = async () => {
    axios
      .get("http://localhost:8000/review/getReviews/" + book._id)
      .then((res) => {
        setReviews(res.data.data);
      });
  };

  const getUserReview = (rev) => {
    console.log("getUser Reviews");
    axios.get("http://localhost:8000/review/getReview/" + rev).then((res) => {
      let novelData = res.data.data;
      setGivenReview(novelData);
      setGivenReviewTitle(novelData.title);
      setGivenReviewDesc(novelData.description);
    });
  };

  const checkReviewGiven = () => {
    console.log("check review given");
    if (!userData || !userData.books) {
      setGivenReview(null);
      setGivenReviewTitle("");
      setGivenReviewDesc("");
    }
    userData &&
      userData.books &&
      userData.books.forEach((item) => {
        if (item.book === book._id) {
          if (book.reviews) {
            book.reviews.forEach((rev) => {
              if (rev === item.review) {
                getUserReview(rev);
              }
            });
          }
        }
      });
  };

  const calculateRatingPercentages = () => {
    console.log("calculated");
    let total = 0;
    let ratings = [];
    if (book) {
      for (let k in book.rating) {
        total += book.rating[k];
        ratings.push({ rating: k, count: book.rating[k] });
      }
      ratings.forEach((item) => {
        item.percentage = Math.ceil((item.count / total) * 100);
      });
      setRatings(ratings.reverse());
    }
  };
  const calculateAverageRating = () => {
    let total = 0;
    let ratingTotal = 0;
    if (book) {
      for (let k in book.rating) {
        total += book.rating[k];
        ratingTotal += parseInt(k) * book.rating[k];
      }
    }
    setTotalRatings(total);
    if (total === 0) {
      setAverageRating(0);
    } else {
      let averageRating = Math.round((ratingTotal / total) * 10) / 10;
      setAverageRating(averageRating);
    }
  };

  useEffect(() => {
    getReviews();
    calculateRatingPercentages();
    calculateAverageRating();
    //calculateRatingPercentages();
    //calculateAverageRating();
  }, []);

  useEffect(() => {
    checkReviewGiven();
  }, [userData]);
  return (
    <section className="reviewSection">
      <p className="reviewSection-subheading">Reviews</p>
      <div className="reviewSection-reviewStats">
        <div className="reviewSection-reviewStats-count">
          <div className="stars">
            <p className="text">{averageRating}</p>
            <FaStar className="icon" />
          </div>
          <p className="ratings">
            <span>{totalRatings}</span>
            <span className="text">Ratings</span>{" "}
          </p>
          <p className="reviews">
            <span>{book.reviews.length}</span>
            <span className="text">Reviews</span>{" "}
          </p>
        </div>
        <div className="reviewSection-reviewStats-graph">
          {ratings &&
            ratings.map((item) => {
              return (
                <span className="graph">
                  <p className="rating">
                    <span className="num">{item.rating}</span>
                    <FaStar className="icon" />
                  </p>
                  <span className="percent">
                    <span
                      className="percent-covered"
                      style={{ width: `${item.percentage}%` }}
                    ></span>
                  </span>
                  <p className="count">{item.count}</p>
                </span>
              );
            })}
        </div>
      </div>

      {givenReview ? (
        <div className="reviewSection-myReview">
          <p className="reviewSection-myReview-heading">Edit Review</p>
          <div className="reviewSection-myReview-content">
            <input
              type="text"
              className="titleInput"
              placeholder="Review title"
              value={givenReviewTitle}
              onChange={(e) => setGivenReviewTitle(e.target.value)}
            />
            <textarea
              type="text"
              className="reviewInput"
              placeholder="Write review here"
              value={givenReviewDesc}
              onChange={(e) => setGivenReviewDesc(e.target.value)}
            ></textarea>
            <div className="rate">
              <div className="text">Rating: </div>
              <div className="stars">
                {Array(5)
                  .fill(0)
                  .map((_, id) => {
                    return (
                      <FaStar
                        key={`star${id}`}
                        onMouseEnter={() => {
                          setHoveredStar(id + 1);
                        }}
                        onMouseLeave={() => {
                          setHoveredStar(0);
                        }}
                        onClick={() => {
                          addRating(id + 1);
                        }}
                        className={`icon ${
                          (hoveredStar > 0 && id + 1 <= hoveredStar) ||
                          (rated > 0 && id + 1 <= rated)
                            ? "hovered"
                            : ""
                        }`}
                      />
                    );
                  })}
              </div>
              <button
                className={`submit ${
                  givenReviewTitle && givenReviewDesc && isLoggedIn
                    ? "submit-enabled"
                    : "submit-disabled"
                }`}
                onClick={editReview}
              >
                Edit
              </button>
            </div>
            {/* <button className="submitReview">Submit</button> */}
          </div>
        </div>
      ) : (
        <div className="reviewSection-myReview">
          <p className="reviewSection-myReview-heading">Write Review</p>
          <div className="reviewSection-myReview-content">
            <input
              type="text"
              className="titleInput"
              placeholder="Review title"
              value={reviewTitleInput}
              onChange={(e) => setReviewTitleInput(e.target.value)}
            />
            <textarea
              type="text"
              className="reviewInput"
              placeholder="Write review here"
              value={reviewInput}
              onChange={(e) => setReviewInput(e.target.value)}
            ></textarea>
            <div className="rate">
              <div className="text">Rating: </div>
              <div className="stars">
                {Array(5)
                  .fill(0)
                  .map((_, id) => {
                    return (
                      <FaStar
                        key={`star${id}`}
                        onMouseEnter={() => {
                          setHoveredStar(id + 1);
                        }}
                        onMouseLeave={() => {
                          setHoveredStar(0);
                        }}
                        onClick={() => {
                          addRating(id + 1);
                        }}
                        className={`icon ${
                          (hoveredStar > 0 && id + 1 <= hoveredStar) ||
                          (rated > 0 && id + 1 <= rated)
                            ? "hovered"
                            : ""
                        }`}
                      />
                    );
                  })}
              </div>
              <button
                className={`submit ${
                  reviewTitleInput && reviewInput && isLoggedIn
                    ? "submit-enabled"
                    : "submit-disabled"
                }`}
                onClick={addReview}
              >
                Submit
              </button>
            </div>
            {/* <button className="submitReview">Submit</button> */}
          </div>
        </div>
      )}
      <div className="reviewSection-reviews">
        <p className="reviewSection-reviews-heading">Given Reviews</p>
        <div className="reviewSection-reviews-content">
          {reviews.slice(0, page * REVIEWS_LIMIT).map((review) => {
            return <Review reviewId={review} />;
          })}
          {reviews.slice(0, page * REVIEWS_LIMIT).length < reviews.length && (
            <p className="loadMore" onClick={() => setPage(page + 1)}>
              View More...
            </p>
          )}
        </div>
        {reviews.length === 0 && (
          <div className="reviewSection-reviews-noContent">
            No reviews given yet
          </div>
        )}
      </div>
    </section>
  );
}

export default Reviews;
