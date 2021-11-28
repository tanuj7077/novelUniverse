import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";

import LoginModal from "./components/Modals/LoginModal";

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
import AddContent from "./pages/AddContent";
import Alert from "./components/Alert/Alert";
import Loading from "./components/Loading/Loading";
import { useGlobalContext } from "./context";

axios.defaults.withCredentials = true;
function App() {
  const { setIsLoggedIn, setUserData, userData, isLoggedIn, setIsLoading } =
    useGlobalContext();
  axios.interceptors.request.use((request) => {
    setIsLoading(true);
    return request;
  });
  axios.interceptors.response.use((response) => {
    setIsLoading(false);
    return response;
  });
  const getLoggedIn = async () => {
    const loggedInRes = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/auth/loggedIn`
    );
    if (loggedInRes.data.loggedIn) {
      console.log(loggedInRes.data);
      setIsLoggedIn(true);
      setUserData(loggedInRes.data.userData);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      getLoggedIn();
    }
  }, []);
  return (
    <Switch>
      <Route path="/" exact>
        <Alert />
        <Loading />
        <LoginModal />
        <Landing />
      </Route>
      <Route path="/chapter/:id" exact>
        <LoginModal />
        <Alert />
        <Loading />
        <Chapter />
      </Route>

      <>
        {/* <SideNav /> */}
        <TopNav />
        <LoginModal />
        <Alert />
        <Loading />
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
          {isLoggedIn ? <Collection /> : <Redirect to="/home" exact />}
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/book/:bookId">
          <BookPage />
        </Route>
        <Route path="/add">
          {isLoggedIn &&
            userData &&
            userData.username === process.env.REACT_APP_ADMIN_USERNAME && (
              <AddContent />
            )}
        </Route>
      </>
    </Switch>
  );
}

export default App;
