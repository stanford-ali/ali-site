import { combineReducers } from "redux";
import * as Reducers from "./reducers";
import { connectRouter } from "connected-react-router";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    base: Reducers.base,
    auth: Reducers.auth,
    admin: Reducers.admin,
    project: Reducers.project,
    questions: Reducers.questions,
  });

export default createRootReducer;
