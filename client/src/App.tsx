import React, { useEffect } from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route, Redirect } from "react-router-dom";
import history from "./history";

import Admin from "./components/Admin/Admin";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Projects from "./components/Projects/Projects";
import Unauthorized from "./components/Unauthorized/Unauthorized";

import "./App.scss";

const App = () => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/admin" />
      </Switch>
    </ConnectedRouter>
  );
};

export default App;
