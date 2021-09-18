import React from "react";

function Summary({ content }) {
  return (
    <section className="aboutSection">
      <p className="aboutSection-subheading">About</p>
      <p className="aboutSection-content">{content}</p>
    </section>
  );
}

export default Summary;
