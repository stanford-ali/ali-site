import { Reducer } from "redux";
import {
  IBaseState,
  LOADING_START,
  LOADING_END,
  SET_REDIRECT,
  THROW_ERROR,
} from "./base.types";

const initialState: IBaseState = {
  loading: false,
  redirect: "/",
  error: false,
};

const base: Reducer<any> = (state: any = initialState, action) => {
  switch (action.type) {
    case LOADING_START:
      return {
        ...state,
        loading: true,
      };
    case LOADING_END:
      return {
        ...state,
        loading: false,
      };
    case SET_REDIRECT:
      return {
        ...state,
        redirect: action.payload,
      };
    case THROW_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default base;
