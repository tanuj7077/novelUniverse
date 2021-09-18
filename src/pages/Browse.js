import React, { useState, useEffect } from "react";
import { categoryList, browseNovels } from "../mockData";
import { AiOutlineSearch } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { Route } from "react-router-dom";
import bg1 from "../assets/abstract/1.jpg";
import {
  IoInformationCircleOutline,
  IoAddCircleOutline,
} from "react-icons/io5";
//1,2,3,6,7,9,11,12

const Browse = () => {
  const [tagAdded, setTagAdded] = useState([]);
  const [tagRemoved, setTagRemoved] = useState([]);
  const [advancedSearchVisible, setAdvancedSearchVisible] = useState(false);
  const [filterInfoVisible, setFilterInfoVisible] = useState(false);

  const checkTagAddedPresense = (tag) => {
    return tagAdded.includes(tag);
  };
  const checkTagRemovedPresense = (tag) => {
    return tagRemoved.includes(tag);
  };
  const toggleItem = (tag) => {
    //if item in tagAdded, remove from tagAdded and add item to tagRemoved
    //else if item in tagRemoved, remove from tagRemoved
    //else add item to tagAdded
    if (tagAdded.includes(tag)) {
      let newList = [...tagAdded];
      let index;
      newList.forEach((item, i) => {
        if (item === tag) {
          index = i;
        }
      });
      newList.splice(index, 1);
      setTagAdded(newList);
      console.log("removed from tagAdded");
      newList = [...tagRemoved];
      newList.push(tag);
      setTagRemoved(newList);
      console.log("added to tagRemoved");
      return;
    } else if (tagRemoved.includes(tag)) {
      let newList = [...tagRemoved];
      let index;
      newList.forEach((item, i) => {
        if (item === tag) {
          index = i;
        }
      });
      newList.splice(index, 1);
      setTagRemoved(newList);
      console.log("removed from tagRemoved");
      return;
    } else {
      let newList = [...tagAdded];
      newList.push(tag);
      setTagAdded(newList);
      console.log("added to tagAdded");
      return;
    }
  };
  const [currentStatus, setCurrentStatus] = useState("all");
  const [currentOrder, setCurrentOrder] = useState("new");
  let status = ["all", "completed", "ongoing"];
  let order = ["new", "views", "ratings"];
  return (
    <div className="browsePage">
      <div className="browsePage-container">
        <div className="browsePage-container-top">
          <div className="search">
            <input type="text" className="search-input" placeholder="Search" />
            <AiOutlineSearch className="search-icon" />
          </div>
          <div className="filters">
            <p
              className="filters-heading"
              onClick={() => setAdvancedSearchVisible(!advancedSearchVisible)}
            >
              <span>Advanced Search</span>
              <span>
                <IoAddCircleOutline className="infoIcon" />
              </span>
            </p>
            {advancedSearchVisible && (
              <div className="filters-content">
                <div className="genres">
                  <p className="genres-heading">
                    <span>Genre</span>
                    <span>
                      <IoInformationCircleOutline
                        className="infoIcon"
                        onClick={() => setFilterInfoVisible(!filterInfoVisible)}
                      />
                    </span>
                    <span
                      className={`filterPopup ${
                        filterInfoVisible ? "filterPopup-visible" : ""
                      }`}
                    >
                      <div className="item">
                        <div className="genre genre-inc">Action</div>
                        <p className="desc">: Genre included</p>
                      </div>
                      <div className="item">
                        <div className="genre genre-exc">Action</div>
                        <p className="desc">: Genre Excluded</p>
                      </div>
                    </span>
                  </p>
                  <div className="genres-items">
                    {categoryList &&
                      categoryList.map((genre) => {
                        return (
                          <div
                            className={`genres-items-item ${
                              checkTagAddedPresense(genre)
                                ? "genres-items-item-add"
                                : checkTagRemovedPresense(genre)
                                ? "genres-items-item-remove"
                                : ""
                            }`}
                            onClick={() => toggleItem(genre)}
                          >
                            {genre}
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="genres">
                  <div className="genres-heading">Status</div>
                  <div className="genres-items">
                    {categoryList &&
                      status.map((item) => {
                        return (
                          <div
                            className={`genres-items-item ${
                              item === currentStatus
                                ? "genres-items-item-add"
                                : ""
                            }`}
                            onClick={() => setCurrentStatus(item)}
                          >
                            {item}
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="genres">
                  <div className="genres-heading">Order By</div>
                  <div className="genres-items">
                    {categoryList &&
                      order.map((item) => {
                        return (
                          <div
                            className={`genres-items-item ${
                              item === currentOrder
                                ? "genres-items-item-add"
                                : ""
                            }`}
                            onClick={() => setCurrentOrder(item)}
                          >
                            {item}
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="submitBtn">Apply</div>
              </div>
            )}
          </div>
        </div>
        <div className="novels">
          <div className="novels-heading">Novels List</div>
          <div className="novels-filters"></div>
          <div className="novels-list">
            {browseNovels.map((item) => {
              return (
                <div className="novel">
                  <div
                    className="novel-img"
                    style={{
                      backgroundImage: `url(${item.img})`,
                    }}
                  ></div>
                  <div className="novel-info">
                    <div className="novel-info-top">
                      <div className="novel-info-top-title">
                        <Route
                          render={({ history }) => (
                            <div
                              className="name"
                              onClick={() => {
                                history.push(`/book/book1`);
                              }}
                            >
                              {item.title}
                            </div>
                          )}
                        />
                        <p className="author">{item.author}</p>
                      </div>

                      <div className="novel-info-top-rating">
                        <div className="ratingText">{item.rating}</div>
                        <FaStar className="ratingIcon" />
                      </div>
                    </div>

                    <div className="novel-info-stats">
                      <div className="novel-info-item">
                        <span className="subHeading">Chapters</span>
                        <span className="count">{item.chapters}</span>
                      </div>
                      <div className="novel-info-item">
                        <span className="subHeading">Rank</span>
                        <span className="count">{item.rank}</span>
                      </div>
                      <div className="novel-info-item">
                        <span className="subHeading">Bookmarked</span>
                        <span className="count">{item.bookmarked}</span>
                      </div>
                      <div className="novel-info-item">
                        <span className="subHeading">Status</span>
                        <span className="count">{item.status}</span>
                      </div>
                    </div>
                    <div className="novel-info-desc">
                      {item.desc.substring(0, 200)}...
                    </div>
                    <div className="novel-info-buttons">
                      <div className="btn">Read</div>
                      <div className="btn">Bookmark</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Browse;
