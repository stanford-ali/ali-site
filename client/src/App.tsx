import React, { useEffect } from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route, Redirect } from "react-router-dom";
import history from "./history";
import { connect } from "react-redux";
import { auth } from "./config/fbConfig";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Projects from "./components/Projects/Projects";

import "./App.scss";
import { fetchUser, logout } from "./store/actions/auth.actions";

const App = (props) => {
  // Auth observable (get the current user)
  useEffect(() => {
    let unsubscribeFromAuth = null;
    unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        // If user exists, set the current user fetchUser
        props.onFetchUser();
      } else {
        // If user doesn't exist, clear user
        return;
        // props.onLogout();
      }
    });

    return () => unsubscribeFromAuth();
  }, []);

  // ternary the switch with loading -> modalLoader
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/login">
          {props.user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route
          exact
          path="/profile"
          component={() => (props.user ? <Profile /> : <Redirect to="/" />)}
        />
        <Route exact path="/admin" />
      </Switch>
    </ConnectedRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUser: () => dispatch(fetchUser()),
    onLogout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
