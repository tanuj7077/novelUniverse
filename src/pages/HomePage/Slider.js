import React, { useRef } from "react";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import Thumbnail from "../../components/NovelThumb/Thumbnail2";
function Slider({ novels }) {
  const sliderRef = useRef(null);
  const rightBtnRef = useRef(null);
  const handleScroll = (side) => {
    console.log("clicked");
    if (side === "right") {
      sliderRef.current.scrollBy(500, 0);
    } else {
      sliderRef.current.scrollBy(-500, 0);
    }
  };
  return (
    <div className="homePage-novels-slider">
      <span className="leftButton" onClick={() => handleScroll("left")}>
        <VscChevronLeft className="icon" />
      </span>
      <div className="novels" ref={sliderRef}>
        <div className="novelSection2">
          {novels.map((item) => {
            return <Thumbnail novel={item} />;
          })}
        </div>
      </div>
      <span
        className="rightButton"
        ref={rightBtnRef}
        onClick={() => handleScroll("right")}
      >
        <VscChevronRight className="icon" />
      </span>
    </div>
  );
}

export default Slider;
