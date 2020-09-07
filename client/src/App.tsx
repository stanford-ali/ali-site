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
import Submit from "./components/Submit/Submit";
import "./App.scss";
import { fetchUser, logout } from "./store/auth/auth.actions";
import { setRedirect } from "./store/base/base.actions";

const App = (props) => {
  // Auth observable (get the current user)
  useEffect(() => {
    let unsubscribeFromAuth = null;
    unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        // If user exists, set the current user fetchUser
        props.onFetchUser(user.uid);
      } else {
        // If user doesn't exist, clear user
        props.onLogout();
      }
    });

    return () => unsubscribeFromAuth();
  }, [props]);

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
            if (props.user) return <Profile />;
            props.setRedirect("/profile");
            return <Redirect to="/login" />;
          }}
        />
        <Route
          exact
          path="/submit"
          component={() => {
            if (props.user) return <Submit />;
            props.setRedirect("/submit");
            return <Redirect to="/login" />;
          }}
        />
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
    onFetchUser: (uid) => dispatch(fetchUser(uid)),
    onLogout: () => dispatch(logout()),
    setRedirect: (route) => dispatch(setRedirect(route)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
