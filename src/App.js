import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";

import { useGlobalContext } from "./context";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Collection from "./pages/Collection";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import BookPage from "./pages/BookPage";

axios.defaults.withCredentials = true;
function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Landing />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/browse">
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
    </Switch>
  );
}

export default App;
