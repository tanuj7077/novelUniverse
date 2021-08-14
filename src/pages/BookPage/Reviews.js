import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

function Reviews() {
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
  useEffect(() => {}, []);
  return (
    <section className="reviewSection">
      <div className="reviewSection-reviewStats">
        <div className="reviewSection-reviewStats-count">
          <div className="stars">
            <p className="text">{reviewObj.star}</p>
            <FaStar className="icon" />
          </div>
          <div className="ratings">{reviewObj.ratingCount} Ratings</div>
          <div className="reviews">{reviewObj.reviewCount} Reviews</div>
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
        {/* <p className="subheading">Give review</p> */}
        <input type="text" className="titleInput" placeholder="Review title" />
        <textarea
          type="text"
          className="reviewInput"
          placeholder="Write review here"
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
                      setRated(id + 1);
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
          <button className="submit">Submit</button>
        </div>
        {/* <button className="submitReview">Submit</button> */}
      </div>
      <div className="reviewSection-reviews">
        {reviewObj.reviews.map((review) => {
          return (
            <div className="review">
              <div className="heading">
                <div className="rated">
                  <p className="count">{review.rating}</p>
                  <FaStar className="icon" />
                </div>
                <p className="title">{review.title}</p>
              </div>
              <span className="desc">
                <p className="text">
                  {review.desc}
                  <span className="more">Read more</span>
                </p>
              </span>
              <div className="reviewUser">{review.user}</div>
            </div>
          );
        })}
        <p className="loadMore">View More...</p>
      </div>
    </section>
  );
}

export default Reviews;
