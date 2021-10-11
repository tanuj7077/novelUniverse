import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
const BrowsePageThumb = ({ novelId }) => {
  //collectionPageThumb
  console.log(novelId);
  const [novel, setNovel] = useState();
  const getNovelData = async () => {
    console.log("getNovelData called");
    await axios.get(`http://localhost:8000/book/${novelId}`).then((res) => {
      console.log(res.data.data.novel);
      setNovel(res.data.data.novel);
    });
  };
  useEffect(() => {
    getNovelData();
  }, []);
  return (
    <>
      {novel && (
        <Route
          render={({ history }) => (
            <div
              className="novels-novel"
              onClick={() => {
                history.push(`/book/${novel._id}`);
              }}
            >
              <div
                className="novels-novel-img"
                style={{
                  backgroundImage: `url(${novel.imageUrl})`,
                }}
              ></div>
              <div className="novels-novel-info">
                <div className="novels-novel-info-title">{novel.name}</div>
                <div className="novels-novel-info-other">
                  <div className="novels-novel-info-other-author novels-novel-info-other-item">
                    <p className="label">Author:</p>
                    {novel.author.length > 15 ? (
                      <p className="data">{novel.author.substring(0, 15)}...</p>
                    ) : (
                      <p className="data">{novel.author}</p>
                    )}
                  </div>
                  <div className="novels-novel-info-other-rating novels-novel-info-other-item">
                    <p className="label">Rating: </p>
                    <p className="data">{novel.averageRating}</p>
                  </div>
                  <div className="novels-novel-info-other-latest novels-novel-info-other-item">
                    <p className="label">Chapters: </p>
                    <p className="data">{novel.chapters.length}</p>
                  </div>
                  <div className="novels-novel-info-other-categories">
                    <p className="label">Categories:</p>
                    <p className="data">
                      {novel.categories.map((tag) => {
                        return <p>{tag}</p>;
                      })}
                    </p>
                  </div>
                </div>

                <div className="novels-novel-info-btns">
                  <span className="btn">Start</span>
                  <span className="btn">Resume</span>
                </div>
              </div>
            </div>
          )}
        />
      )}
    </>
  );
};

export default BrowsePageThumb;
