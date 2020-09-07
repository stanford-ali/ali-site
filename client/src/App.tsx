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
import { fetchUser, logout } from "./store/auth/auth.actions";
import { setRedirect } from "./store/base/base.actions";

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

  // Auth observable (get the current user)
  useEffect(() => {
    let unsubscribeFromAuth = null;
    unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        // If user exists, set the current user fetchUser
        onFetchUser(user.uid);
      } else {
        // If user doesn't exist, clear user
        onLogout();
      }
    });

    return () => unsubscribeFromAuth();
  }, [onFetchUser, onLogout]);

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
