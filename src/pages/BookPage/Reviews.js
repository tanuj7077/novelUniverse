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

  const addReview = () => {
    const Review = {
      title: reviewTitleInput,
      description: reviewInput,
      //rating: rated,
      user: userData._id,
      username: userData.username,
      book: book._id,
    };
    axios.post("http://localhost:8000/review/addReview", Review).then((res) => {
      console.log(res.data);
    });
  };

  const addRating = (rate) => {
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
    //
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

  useEffect(() => {
    getReviews();
    checkReviewGiven();
  }, []);
  return (
    <section className="reviewSection">
      <p className="reviewSection-subheading">Reviews</p>
      <div className="reviewSection-reviewStats">
        <div className="reviewSection-reviewStats-count">
          <div className="stars">
            <p className="text">{reviewObj.star}</p>
            <FaStar className="icon" />
          </div>
          <p className="ratings">
            <span>{reviewObj.ratingCount}</span>
            <span className="text">Ratings</span>{" "}
          </p>
          <p className="reviews">
            <span>{reviewObj.reviewCount}</span>
            <span className="text">Reviews</span>{" "}
          </p>
        </div>
        <div className="reviewSection-reviewStats-graph">
          <span className="graph">
            <p className="rating">
              <span className="num">5</span>
              <FaStar className="icon" />
            </p>
            <span className="percent"></span>
            <p className="count">50</p>
          </span>
          <span className="graph">
            <p className="rating">
              <span className="num">4</span>
              <FaStar className="icon" />
            </p>
            <span className="percent"></span>
            <p className="count">40</p>
          </span>
          <span className="graph">
            <p className="rating">
              <span className="num">3</span>
              <FaStar className="icon" />
            </p>
            <span className="percent"></span>
            <p className="count">20</p>
          </span>
          <span className="graph">
            <p className="rating">
              <span className="num">2</span>
              <FaStar className="icon" />
            </p>
            <span className="percent"></span>
            <p className="count">8</p>
          </span>
          <span className="graph">
            <p className="rating">
              <span className="num">1</span>
              <FaStar className="icon" />
            </p>
            <span className="percent"></span>
            <p className="count">3</p>
          </span>
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
