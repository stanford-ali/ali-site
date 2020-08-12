import React, { useEffect } from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route, Redirect } from "react-router-dom";
import history from "./history";

import { useSelector, useDispatch } from "react-redux";
import { initializeGoogleSignIn } from "./store/actions/auth.actions";

import Admin from "./components/Admin/Admin";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Projects from "./components/Projects/Projects";
import Unauthorized from "./components/Unauthorized/Unauthorized";

import "./App.scss";

const App = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const admin = useSelector((state) => state.auth.admin);

  useEffect(() => {
    // add script to html on first render
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.onload = () => {
      dispatch(initializeGoogleSignIn());
      window.gapi.load("signin2", () => {
        window.gapi.signin2.render("login-button", {});
      });
    };
    document.body.appendChild(script);
  }, [dispatch]);

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/projects" component={Projects} />
        {/* PROTECTED ROUTING */}
        <Route
          exact
          path="/login"
          component={() =>
            !loggedIn ? (
              <Login />
            ) : admin ? (
              <Redirect to="/admin" />
            ) : (
              <Redirect to="/profile" />
            )
          }
        />
        <Route
          exact
          path="/profile"
          component={() => (loggedIn ? <Profile /> : <Redirect to="login" />)}
        />
        <Route
          exact
          path="/admin"
          component={() =>
            loggedIn ? (
              admin ? (
                <Admin />
              ) : (
                <Unauthorized />
              )
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </Switch>
    </ConnectedRouter>
  );
};

export default App;
