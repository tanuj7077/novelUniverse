import React, { useState, useEffect } from "react";
import { categoryList } from "../mockData";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Route, useHistory } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import bg1 from "../assets/abstract/1.jpg";
import DataThumb from "../components/NovelThumb/DataThumb";
import axios from "axios";
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
  const [searchMode, setSearchMode] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [novels, setNovels] = useState([]);
  const history = useHistory();

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_LIMIT = 4;
  const nextPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
      newList = [...tagRemoved];
      newList.push(tag);
      setTagRemoved(newList);
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
      return;
    } else {
      let newList = [...tagAdded];
      newList.push(tag);
      setTagAdded(newList);
      return;
    }
  };
  const handleSearch = (text) => {
    setSearchText(text);
    if (text.length === 0) {
      setSearchResult([]);
      return;
    }
    axios.get(`http://localhost:8000/book/searchBook/${text}`).then((res) => {
      if (res.data.data.bookList.length > 0) {
        setSearchResult(res.data.data.bookList);
      } else {
        setSearchResult([]);
      }
    });
  };
  const goToNovel = (id) => {
    history.push(`book/${id}`);
  };
  const getNovels = () => {
    axios
      .post(
        `http://localhost:8000/book/getNovels/${currentStatus}/${currentOrder}/${currentPage}/${PAGE_LIMIT}`,
        {
          tagAdded,
          tagRemoved,
        }
      )
      .then((res) => {
        setNovels(res.data.data);
        setTotalPages(res.data.totalPages);
      });
  };
  //useEffect
  const [currentStatus, setCurrentStatus] = useState("all");
  const [currentOrder, setCurrentOrder] = useState("new");
  let status = ["all", "completed", "ongoing"];
  let order = ["new", "views", "ratings"];

  useEffect(() => {
    getNovels();
  }, [currentStatus, currentOrder, currentPage]);
  return (
    <div className="browsePage">
      <div className="browsePage-container">
        <div
          className={`browsePage-container-top ${
            searchMode ? "browsePage-container-top-searchMode" : ""
          }`}
        >
          <IoCloseOutline
            className="closeIcon"
            onClick={() => {
              setSearchMode(false);
              setSearchResult([]);
              setSearchText("");
            }}
          />
          <div className="search">
            <input
              type="text"
              className="search-input"
              placeholder="Search"
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              onClick={() => setSearchMode(true)}
            />
            <AiOutlineSearch className="search-icon" />
          </div>
          {searchResult.length > 0 && (
            <ul className="searchList">
              {searchResult.map((book) => {
                return (
                  <li
                    className="searchList-item"
                    onClick={() => goToNovel(book._id)}
                  >
                    <span
                      className="searchList-item-img"
                      style={{ backgroundImage: `url(${book.imageUrl})` }}
                    ></span>
                    <p className="searchList-item-text">
                      <span className="searchList-item-text-title">
                        {book.name}
                      </span>
                      <span className="searchList-item-text-chapters">
                        Chapters {book.chapters.length}
                      </span>
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
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
                <div className="submitBtn btn" onClick={getNovels}>
                  Apply
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
              </div>
            )}
          </div>
        </div>
        <div className="novels">
          <div className="novels-heading">Novels List</div>
          <div className="novels-list">
            {novels.map((item) => {
              return <DataThumb key={"browsePage" + item._id} novel={item} />;
            })}
          </div>
          <div className="novels-buttons">
            <button className="novels-buttons-btn btn" onClick={previousPage}>
              <FaChevronLeft className="novels-buttons-btn-icon" />
            </button>
            <p className="novels-buttons-page">
              {currentPage} / {totalPages}
            </p>
            <button className="novels-buttons-btn btn" onClick={nextPage}>
              <FaChevronRight className="novels-buttons-btn-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Browse;
