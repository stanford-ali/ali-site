import React, { useEffect, useCallback } from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route, Redirect } from "react-router-dom";
import history from "./history";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "./config/fbConfig";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Projects from "./components/Projects/Projects";
import Submit from "./components/Submit/Submit";
import "./App.scss";
import { fetchUser, logout, loadUser } from "./store/auth/auth.actions";
import { setRedirect } from "./store/base/base.actions";
import axios from "axios";

// Helper that creates the user in the DB
const createUser = async (user) => {
  const firstName = user.displayName.split(" ")[0];
  const lastName = user.displayName.split(" ")[1];
  const newUser = {
    uid: user.uid,
    firstname: firstName,
    lastname: lastName,
    email: user.email,
    image: user.photoURL || "",
    university: "", // tentative until post-signup questions are implemented
    year: "", // tentative until post-signup questions are implemented
    skills: "", // tentative until post-signup questions are implemented
    programming: "", // tentative until post-signup questions are implemented
    resume: "", // tentative until post-signup questions are implemented
    following: [],
    faculty: false, // tentative until post-signup questions are implemented
    admin: false,
  };

  // Create new user in database
  await axios
    .post(`http://localhost:5000/users/${user.uid}`, newUser)
    .then(() => console.log("post is done"))
    .catch((error) => console.log(error));
};

const App = () => {
  // Get user from redux
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  // Dispatch action creators from redux
  const onFetchUser = useCallback((uid) => dispatch(fetchUser(uid)), [
    dispatch,
  ]);
  const onLogout = useCallback(() => dispatch(logout()), [dispatch]);
  const onSetRedirect = useCallback((route) => dispatch(setRedirect(route)), [
    dispatch,
  ]);
  const onLoadUser = useCallback((user) => dispatch(loadUser(user)), [
    dispatch,
  ]);

  // Auth observable (get the current user)
  useEffect(() => {
    let unsubscribeFromAuth = null;
    unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      // If there is an authenticated Firebase User
      if (user) {
        // See if we need to create the user or fetch the user
        await axios
          .get(`http://localhost:5000/users/${user.uid}`)
          .catch(() =>
            // Create the user in the DB
            createUser(user)
          )
          .then(() => onFetchUser(user.uid));
      } else {
        // If user doesn't exist, clear user
        onLogout();
      }
    });

    return () => unsubscribeFromAuth();
  }, [onFetchUser, onLogout, onLoadUser]);

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/login" component={Login} />
        <Route
          exact
          path="/profile"
          component={() => {
            if (user) return <Profile />;
            onSetRedirect("/profile");
            return <Redirect to="/login" />;
          }}
        />
        <Route
          exact
          path="/submit"
          component={() => {
            if (user) return <Submit />;
            onSetRedirect("/submit");
            return <Redirect to="/login" />;
          }}
        />
      </Switch>
    </ConnectedRouter>
  );
};

export default App;
