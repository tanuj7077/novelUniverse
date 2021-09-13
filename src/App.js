import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";

import { useGlobalContext } from "./context";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Collection from "./pages/CollectionPage/Collection";
import Profile from "./pages/ProfilePage/Profile";
import Contact from "./pages/Contact";
import BookPage from "./pages/BookPage";
import SideNav from "./components/Navigation/SideNav";
import TopNav from "./components/Navigation/TopNav";
import Chapter from "./components/Chapter/Chapter";
import Background from "./components/Background/Background";

axios.defaults.withCredentials = true;
function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Landing />
      </Route>
      <Route path="/chapter/:id" exact>
        <Chapter />
      </Route>
      <>
        {/* <SideNav /> */}
        <TopNav />
        {/* <Background /> */}
        <Route path="/home">
          <Background />
          <Home />
        </Route>
        <Route path="/browse">
          <Background />
          <Browse />
        </Route>
        <Route path="/collection">
          <Collection />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/book/:id">
          <BookPage />
        </Route>
      </>
    </Switch>
  );
}

export default App;
