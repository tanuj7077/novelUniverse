import React, { useState, useEffect, useRef } from "react";
import Carousel from "../components/Carousel/Carousel";
import HomePageNovels from "../components/NovelThumb/HomePageNovels";
import Alert from "../components/Alert/Alert";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import { AiOutlineClockCircle } from "react-icons/ai";
import axios from "axios";
import { browseNovels } from "../mockData";
import Slider from "../pages/HomePage/Slider";
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
  const [latestUpdates, setLatestUpdates] = useState([]);
  const fetchLatestUpdates = async () => {
    await axios.get("http://localhost:8000/book/latestUpdates").then((res) => {
      setLatestUpdates(res.data.data.latestUpdates);
    });
  };
  useEffect(() => {
    fetchNewRelease();
    fetchMostViewed();
    fetchLatestUpdates();
  }, []);

  return (
    <div className="homePage">
      <div className="homePage-container">
        <Carousel />
        <div className="homePage-novels">
          <p className="homePage-novels-heading">New Releases</p>
          <Slider novels={newRelease} />
        </div>
        <div className="homePage-novels">
          <p className="homePage-novels-heading">Most Viewed</p>
          <Slider novels={mostViewed} />
        </div>
        <div className="homePage-novels">
          <p className="homePage-novels-heading">Latest Updates</p>
          <div className="homePage-novelList">
            {latestUpdates &&
              latestUpdates.map((novel) => {
                return <HomePageNovels novel={novel} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
