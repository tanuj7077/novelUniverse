import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";

function Review({ reviewId }) {
  const [review, setReview] = useState();
  const [expanded, setExpanded] = useState(false);
  const [username, setUsername] = useState("");
  const toggleReadMore = () => {
    setExpanded(!expanded);
  };
  const getReview = async () => {
    axios
      .get("http://localhost:8000/review/getReview/" + reviewId)
      .then((res) => {
        setReview(res.data.data);
        getUsername(res.data.data.user);
        //checkReviewGiven();
      });
  };
  const getUsername = (userId) => {
    axios
      .get(`http://localhost:8000/user/getUpdatedUserData/${userId}`)
      .then((res) => {
        setUsername(res.data.userData.username);
      });
  };
  useEffect(() => {
    getReview();
  }, []);
  return (
    <>
      {review ? (
        <div className="review">
          <div className="heading">
            <p className="title">{review.title}</p>
          </div>
          <span className="desc">
            {!expanded ? (
              <p className="text">
                {review.description.length > 400
                  ? review.description.substring(0, 400) + "..."
                  : review.description}
                {review.description.length > 400 && (
                  <span className="more" onClick={toggleReadMore}>
                    Read more
                  </span>
                )}
              </p>
            ) : (
              <p className="text">
                {review.description}
                {
                  <span className="more" onClick={toggleReadMore}>
                    Read Less
                  </span>
                }
              </p>
            )}
          </span>
          <div className="reviewUser">{username}</div>
        </div>
      ) : (
        <div className="review-notLoaded"></div>
      )}
    </>
  );
}

export default Review;
