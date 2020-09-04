import {
  LOADING_START,
  LOADING_END,
  SET_REDIRECT,
  THROW_ERROR,
} from "./base.types";

export const loadingStart = () => ({
  type: LOADING_START,
});

export const loadingEnd = () => ({
  type: LOADING_END,
});

export const setRedirect = (redirect) => ({
  type: SET_REDIRECT,
  payload: redirect,
});

export const throwError = (error) => ({
  type: THROW_ERROR,
  payload: error,
});
