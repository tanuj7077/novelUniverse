import React, { useState, useEffect } from "react";
import { data } from "../mockData";
import { FaStar } from "react-icons/fa";

const Home = () => {
  console.log(data);
  return (
    <div className="homePage">
      <div className="homePage-novels">
        <p className="homePage-novels-heading">New Releases</p>
        <div className="homePage-novels-content">
          {data &&
            data.map((item) => {
              return (
                <div className="novel">
                  <div
                    className="novel-img"
                    style={{
                      backgroundImage: `url(${item.img})`,
                    }}
                  ></div>
                  <div className="novel-info">
                    <div className="novel-info-title">{item.title}</div>
                    <div className="novel-info-rating">
                      {item.rating}
                      <FaStar />
                    </div>
                    <div className="novel-info-ranking">Rank: {item.rank}</div>
                  </div>
                </div>
              );
            })}
        </div>
        <p className="homePage-novels-more">View More...</p>
      </div>
      <div className="homePage-novels">
        <p className="homePage-novels-heading">Most Viewed Today</p>
        <div className="homePage-novels-content">
          {data &&
            data.map((item) => {
              return (
                <div className="novel">
                  <div
                    className="novel-img"
                    style={{
                      backgroundImage: `url(${item.img})`,
                    }}
                  ></div>
                  <div className="novel-info">
                    <div className="novel-info-title">{item.title}</div>
                    <div className="novel-info-counts">
                      <section className="novel-info-rating">
                        <p className="novel-info-rating-text">{item.rating}</p>
                        <FaStar className="novel-info-rating-icon" />
                      </section>
                      <div className="novel-info-ranking">
                        Rank: {item.rank}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <p className="homePage-novels-more">View More...</p>
      </div>
    </div>
  );
};
export default Home;
