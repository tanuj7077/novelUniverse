import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context";

const Loading = () => {
  const { isLoading } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(isLoading);
    console.log(isLoading);
  }, [isLoading]);
  return (
    <div className={`loadingAnim ${!loading && "loadingAnim-invisible"}`}></div>
  );
};

export default Loading;
