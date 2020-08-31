import { Reducer } from "redux";
import { IAuthState, SIGN_OUT } from "../types/auth.types";

const initialState: IAuthState = {
  authInstance: null,
  loggedIn: null,
  user: null,
  userId: null,
  admin: null,
  loading: false,
};

const auth: Reducer<any> = (state: any = initialState, action): any => {
  switch (action.type) {
    case "SIGNUP_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "LOAD_USER":
      return {
        ...state,
        loggedIn: true,
        user: {
          ...action.payload,
        },
        admin: false,
        loading: false,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        user: null,
      };
    case "LOAD_USER_FAILED":
      return {
        // TODO: ERROR/FAIL CHECKING
      };
    case SIGN_OUT:
      return {
        ...state,
        loggedIn: false,
        user: null,
        userId: null,
        admin: null,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: {
          ...action.payload,
        },
        loading: false,
      };
    case "UPDATE_FOLLOW_START":
      return {
        ...state,
        loading: true,
      };
    case "APPLY_PROJECT_START":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default auth;
