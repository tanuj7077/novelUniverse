import React, { useState, useEffect } from "react";
import Carousel from "../components/Carousel/Carousel";
import Thumbnail from "../components/NovelThumb/Thumbnail";
import Alert from "../components/Alert/Alert";
import axios from "axios";
const Home = () => {
  const [newRelease, setNewRelease] = useState([]); //move to context
  const fetchNewRelease = async () => {
    await axios.get("http://localhost:8000/book/newRelease").then((res) => {
      setNewRelease(res.data.data.newRelease);
    });
  };
  const [mostViewed, setMostViewed] = useState([]);
  const fetchMostViewed = async () => {
    await axios.get("http://localhost:8000/book/mostViewed").then((res) => {
      setMostViewed(res.data.data.mostViewed);
    });
  };
  useEffect(() => {
    fetchNewRelease();
    fetchMostViewed();
  }, []);
  return (
    <div className="homePage">
      {/* <Alert /> */}
      <div className="homePage-container">
        <Carousel />
        <div className="homePage-novels">
          <p className="homePage-novels-heading">New Releases</p>
          <div className="novelSection">
            {newRelease.map((item) => {
              return <Thumbnail novel={item} />;
            })}
          </div>
        </div>
        <div className="homePage-novels">
          <p className="homePage-novels-heading">Most Viewed</p>
          <div className="novelSection">
            {mostViewed.map((item) => {
              return <Thumbnail novel={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
