import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { GoArrowUp } from "react-icons/go";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useGlobalContext } from "../../context";

function Review({ reviewId }) {
  const { userData, isLoggedIn, changeAlert, toggleLoginModalVisibility } =
    useGlobalContext();
  const [review, setReview] = useState();
  const [expanded, setExpanded] = useState(false);
  const [username, setUsername] = useState("");
  const history = useHistory();
  const toggleReadMore = () => {
    setExpanded(!expanded);
  };
  const getReview = async () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/review/getReview/` + reviewId)
      .then((res) => {
        setReview(res.data.data);
        getUsername(res.data.data.user);
      });
  };
  const getUsername = (userId) => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/user/getUpdatedUserData/${userId}`
      )
      .then((res) => {
        setUsername(res.data.userData.username);
      });
  };
  const upvote = () => {
    if (!isLoggedIn) {
      changeAlert({
        type: "error",
        messages: ["You need to login first"],
      });
      toggleLoginModalVisibility();
    }
    if (isLoggedIn && review) {
      if (review.user === userData._id) {
        changeAlert({
          type: "error",
          messages: ["You can't upvote your own review"],
        });
      } else if (review.upvotes.includes(userData._id)) {
        changeAlert({
          type: "error",
          messages: ["Review already upvoted"],
        });
      } else {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/review/upvote/` + reviewId, {
            user: userData._id,
          })
          .then((res) => {
            changeAlert(res.data.message);
            getReview();
          });
      }
    }
  };
  const goToUserProfile = (username) => {
    history.push(`../profile/${username}`);
  };
  useEffect(() => {
    getReview();
  }, []);
  return (
    <>
      {review ? (
        <div className="review">
          <div className="heading">
            <p className="heading-title">{review.title}</p>
            <p className="heading-time">
              {new Date(review.date).toLocaleString()}
            </p>
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
          <div className="info">
            <div
              className="info-reviewUser"
              onClick={() => goToUserProfile(username)}
            >
              {username}
            </div>
            <div className="info-upvotes">
              <GoArrowUp className="info-upvotes-icon" onClick={upvote} />
              <p className="info-upvotes-count">{review.upvotes.length}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="review-notLoaded"></div>
      )}
    </>
  );
}

export default Review;
