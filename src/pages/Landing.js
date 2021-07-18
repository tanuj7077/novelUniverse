import React from "react";
import TopNav from "../components/Navigation/TopNav";
import { Route } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing">
      <div className="landing-top">
        <div className="landing-top-nav">
          <div className="landing-top-nav-logo">E-Novel</div>
          <div className="landing-top-nav-login">Login</div>
        </div>
        <div className="landing-top-intro">
          <div className="landing-top-intro-heading">Ultimate Biblio</div>
          <div className="landing-top-intro-desc">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </div>
          <Route
            render={({ history }) => (
              <div
                onClick={() => {
                  history.push(`/home`);
                }}
                className="landing-top-intro-cta"
              >
                Let's Go!
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};
export default Landing;
