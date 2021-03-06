import React, { useEffect } from "react";
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
      <>
        <TopNav />
        <LoginModal />
        <Alert />
        <Loading />
        <Route path="/home">
          <Background />
          <Home />
        </Route>
        <Route path="/chapter/:id" exact>
          <Chapter />
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
          userData.username === process.env.REACT_APP_ADMIN_USERNAME ? (
            <AddContent />
          ) : (
            <Redirect to="/home" exact />
          )}
        </Route>
      </>
    </Switch>
  );
}

export default App;
