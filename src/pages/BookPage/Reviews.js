import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { useGlobalContext } from "../../context";
import Review from "../../components/Review/Review";

function Reviews({ book }) {
  const { userData, isLoggedIn, getUpdatedUserData } = useGlobalContext();
  let reviewObj = {
    star: 4.3,
    ratingCount: 34,
    reviewCount: 10,
    reviews: [
      {
        user: "John Blake",
        rating: 5,
        title: "Excellent story",
        desc: "Product is very good, But the installation person not followed flipkart precautions like wearig the mask fulltime during installation, Opened the box roughly, the plastics mounted in the box (for repacking ) was teared from the box,we can not re use the box fully.During the payment the HDFC Card shows NOCOST EMI ,But while ordering NO COST EMI was not considered .",
        date: "12/07/2020",
      },
      {
        user: "John Blake",
        rating: 4,
        title: "Excellent story",
        desc: "Product is very good, But the installation person not followed flipkart precautions like wearig the mask fulltime during installation, Opened the box roughly, the plastics mounted in the box (for repacking ) was teared from the box,we can not re use the box fully.During the payment the HDFC Card shows NOCOST EMI ,But while ordering NO COST EMI was not considered .",
        date: "12/07/2020",
      },
      {
        user: "John Blake",
        rating: 3,
        title: "Excellent story",
        desc: "Product is very good, But the installation person not followed flipkart precautions like wearig the mask fulltime during installation, Opened the box roughly, the plastics mounted in the box (for repacking ) was teared from the box,we can not re use the box fully.During the payment the HDFC Card shows NOCOST EMI ,But while ordering NO COST EMI was not considered .",
        date: "12/07/2020",
      },
      {
        user: "John Blake",
        rating: 2,
        title: "Excellent story",
        desc: "Product is very good, But the installation person not followed flipkart precautions like wearig the mask fulltime during installation, Opened the box roughly, the plastics mounted in the box (for repacking ) was teared from the box,we can not re use the box fully.During the payment the HDFC Card shows NOCOST EMI ,But while ordering NO COST EMI was not considered .",
        date: "12/07/2020",
      },
      {
        user: "John Blake",
        rating: 1,
        title: "Excellent story",
        desc: "Product is very good, But the installation person not followed flipkart precautions like wearig the mask fulltime during installation, Opened the box roughly, the plastics mounted in the box (for repacking ) was teared from the box,we can not re use the box fully.During the payment the HDFC Card shows NOCOST EMI ,But while ordering NO COST EMI was not considered .",
        date: "12/07/2020",
      },
    ],
  };
  const [hoveredStar, setHoveredStar] = useState(0);
  const [rated, setRated] = useState(0);

  const [reviewTitleInput, setReviewTitleInput] = useState("");
  const [reviewInput, setReviewInput] = useState("");
  const [reviews, setReviews] = useState([]);
  const [ratingPercentages, setRatingPercentages] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const [ratings, setRatings] = useState();
  const [totalRatings, setTotalRatings] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  const addReview = () => {
    const Review = {
      title: reviewTitleInput,
      description: reviewInput,
      user: userData._id,
      username: userData.username,
      book: book._id,
    };
    axios.post("http://localhost:8000/review/addReview", Review).then((res) => {
      console.log(res.data);
    });
  };

  const addRating = (rate) => {
    if (userData && isLoggedIn) {
      let data = {
        rating: rate,
        userId: userData._id,
        bookId: book._id,
      };
      axios.post("http://localhost:8000/review/addRating", data).then((res) => {
        console.log(res.data);
        setRated(rate);
        getUpdatedUserData();
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
    axios.get("http://localhost:8000/review/getReview/" + rev).then((res) => {
      let novelData = res.data.data;
      //setRated(novelData.rating);
      setReviewTitleInput(novelData.title);
      setReviewInput(novelData.description);
    });
  };

  const checkReviewGiven = () => {
    userData &&
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
    checkReviewGiven();
    calculateRatingPercentages();
    calculateAverageRating();
  }, []);
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
      <div className="reviewSection-myReview">
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
      <div className="reviewSection-reviews">
        {reviews.map((review) => {
          return <Review review={review} />;
        })}
        <p className="loadMore">View More...</p>
      </div>
    </section>
  );
}

export default Reviews;
