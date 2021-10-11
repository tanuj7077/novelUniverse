import React, { useState, useEffect, useRef } from "react";
import { browseNovels } from "../../mockData";
import { FaStar } from "react-icons/fa";
import { Route } from "react-router-dom";
import useOnScreen from "../../components/Utilities/useOnScreen";
import bg1 from "../../assets/abstract/1.jpg";
import BrowsePageThumb from "../../components/NovelThumb/BrowsePageThumb";
import { useGlobalContext } from "../../context";
import axios from "axios";
const Collection = () => {
  const { userData } = useGlobalContext();
  const bookmarkedRef = useRef();
  const bookmarkedIsVisible = useOnScreen(bookmarkedRef);
  const ongoingRef = useRef();
  const ongoingIsVisible = useOnScreen(ongoingRef);
  const completedRef = useRef();
  const completedIsVisible = useOnScreen(completedRef);
  const [collectionItems, setCollectionItems] = useState({});
  const [bookmarked, setBookmarked] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [completed, setCompleted] = useState([]);
  const moveToBookmarked = () => {
    document.getElementById("bookmarked").scrollIntoView(true);
  };
  const moveToOngoing = () => {
    document.getElementById("ongoing").scrollIntoView(true);
  };
  const moveToCompleted = () => {
    document.getElementById("completed").scrollIntoView(true);
  };
  const getCollectionItems = async () => {
    userData &&
      (await axios
        .get(`http://localhost:8000/book/getCollectionItems/${userData._id}`)
        .then((res) => {
          setCollectionItems(res.data.data);
        }));
  };
  useEffect(() => {
    getCollectionItems();
  }, []);
  return (
    <div className="collectionPage">
      <div
        className="collectionPage-background"
        style={{
          backgroundImage: `url(${bg1})`,
        }}
      ></div>
      <div className="collectionPage-leftPane">
        <div
          className={`item ${bookmarkedIsVisible ? "current" : ""}`}
          onClick={moveToBookmarked}
        >
          <p id="bookmarkedText">Bookmarked</p>
        </div>
        <div
          className={`item ${ongoingIsVisible ? "current" : ""}`}
          onClick={moveToOngoing}
        >
          <p id="ongoingText">Ongoing</p>
        </div>
        <div
          className={`item ${completedIsVisible ? "current" : ""}`}
          onClick={moveToCompleted}
        >
          <p id="completedText">Completed</p>
        </div>
      </div>
      <div
        className={`collectionPage-rightPane ${
          bookmarkedIsVisible ? "collectionPage-rightPane-bookmarked" : ""
        } ${ongoingIsVisible ? "collectionPage-rightPane-ongoing" : ""}
        ${completedIsVisible ? "collectionPage-rightPane-completed" : ""}`}
      >
        <div className="novels" id="bookmarked" ref={bookmarkedRef}>
          {collectionItems &&
            collectionItems.bookmarked &&
            collectionItems.bookmarked.map((item) => {
              return <BrowsePageThumb novelId={item} />;
            })}
        </div>

        <div className="novels" id="ongoing" ref={ongoingRef}>
          {collectionItems &&
            collectionItems.ongoing &&
            collectionItems.ongoing.map((item) => {
              return <BrowsePageThumb novelId={item} />;
            })}
        </div>

        <div className="novels" id="completed" ref={completedRef}>
          {collectionItems &&
            collectionItems.completed &&
            collectionItems.completed.map((item) => {
              return <BrowsePageThumb novelId={item} />;
            })}
        </div>
      </div>
    </div>
  );
};
export default Collection;
