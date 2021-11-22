import React from "react";

function Summary({ content, loading }) {
  return (
    <section className="aboutSection">
      <p className="aboutSection-subheading">About</p>
      {!loading ? (
        <p className="aboutSection-content">{content}</p>
      ) : (
        <p className="aboutSection-content-loading">Loading...</p>
      )}
    </section>
  );
}

export default Summary;
