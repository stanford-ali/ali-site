import { combineReducers } from "redux";
import baseReducer from "./base/base.reducer";
import authReducer from "./auth/auth.reducer";
import projectsReducer from "./projects/projects.reducer";
import submitReducer from "./submit/submit.reducer";
import profileReducer from "./profile/profile.reducer";

import { connectRouter } from "connected-react-router";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    base: baseReducer,
    auth: authReducer,
    project: projectsReducer,
    submit: submitReducer,
    profile: profileReducer,
  });

export default createRootReducer;
