import React, { useState, useEffect, useRef } from "react";
import { browseNovels } from "../../mockData";
import { FaStar } from "react-icons/fa";
import { Route } from "react-router-dom";
import useOnScreen from "../../components/Utilities/useOnScreen";
import bg1 from "../../assets/abstract/1.jpg";
import CollectionPageNovel from "../../components/NovelThumb/CollectionPageNovel";
import { useGlobalContext } from "../../context";
import axios from "axios";
const Collection2 = () => {
  const { userData } = useGlobalContext();
  const [collectionItems, setCollectionItems] = useState({});
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
  }, [userData]);
  return (
    <div className="collectionPage">
      <div
        className="collectionPage-background"
        style={{
          backgroundImage: `url(${bg1})`,
        }}
      ></div>
      <div className={`collectionPage-container`}>
        <div className="novels" id="bookmarked">
          <p className="novels-heading">Bookmarked</p>
          <div className="novels-container">
            {collectionItems &&
              collectionItems.bookmarked &&
              collectionItems.bookmarked.map((item) => {
                return <CollectionPageNovel novelId={item} />;
              })}
            {collectionItems &&
              collectionItems.bookmarked &&
              collectionItems.bookmarked.length === 0 && (
                <div className="novels-empty">
                  You have not bookmarked any novel yet
                </div>
              )}
          </div>
        </div>

        <div className="novels" id="ongoing">
          <p className="novels-heading">Ongoing</p>
          <div className="novels-container">
            {collectionItems &&
              collectionItems.ongoing &&
              collectionItems.ongoing.map((item) => {
                return <CollectionPageNovel novelId={item} />;
              })}
            {collectionItems &&
              collectionItems.ongoing &&
              collectionItems.ongoing.length === 0 && (
                <div className="novels-empty">
                  You didn't start reading any novel yet
                </div>
              )}
          </div>
        </div>

        <div className="novels" id="completed">
          <p className="novels-heading">Completed</p>
          <div className="novels-container">
            {collectionItems &&
              collectionItems.completed &&
              collectionItems.completed.map((item) => {
                return <CollectionPageNovel novelId={item} />;
              })}
            {collectionItems &&
              collectionItems.completed &&
              collectionItems.completed.length === 0 && (
                <div className="novels-empty">
                  You have not completed any novel yet
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Collection2;
