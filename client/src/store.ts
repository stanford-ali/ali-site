import { createStore, applyMiddleware } from "redux";
import createRootReducer from "./store/index";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware } from "connected-react-router";
import history from "./history";

const middleware = [thunkMiddleware, routerMiddleware(history)];

const store = createStore(
  createRootReducer(history),
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
