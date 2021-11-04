import React from "react";
import bg1 from "../../assets/abstract/1.jpg"; //1,11,12
const Background = () => {
  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(${bg1})`,
      }}
    ></div>
  );
};

export default Background;
