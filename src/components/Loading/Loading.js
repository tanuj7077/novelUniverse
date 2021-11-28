import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context";
import { useLocation } from "react-router-dom";

const Loading = () => {
  const { isLoading } = useGlobalContext();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);
  useEffect(() => {
    let arr = location.pathname.split("/").map(String);
    if (arr.length > 1) {
      //console.log(arr[1]);
      console.log(arr[1] === "");
    }
  }, [location]);
  return (
    <>
      <div
        className={`loadingAnim ${
          (!loading || location.pathname.split("/").map(String)[1] === "") &&
          "loadingAnim-invisible"
        }`}
      ></div>
    </>
  );
};

export default Loading;
