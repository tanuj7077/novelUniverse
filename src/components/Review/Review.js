import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

function Review({ review }) {
  const [expanded, setExpanded] = useState(false);
  const toggleReadMore = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="review">
      <div className="heading">
        {/* <div className="rated">
          <p className="count">{review.rating}</p>
          <FaStar className="icon" />
        </div> */}
        <p className="title">{review.title}</p>
      </div>
      <span className="desc">
        <p className="text">
          {review.description}
          <span className="more" onClick={toggleReadMore}>
            Read more
          </span>
        </p>
      </span>
      <div className="reviewUser">{review.user.name}</div>
    </div>
  );
}

export default Review;
