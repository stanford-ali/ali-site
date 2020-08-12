import { Reducer } from "redux";
import { IAuthState, INITIALIZE_GAPI, SIGN_OUT } from "../types/auth.types";

const initialState: IAuthState = {
  authInstance: null,
  loggedIn: null,
  user: null,
  userId: null,
  admin: null,
};

const auth: Reducer<any> = (state: any = initialState, action): any => {
  switch (action.type) {
    case INITIALIZE_GAPI:
      return {
        ...state,
        authInstance: action.payload,
      };
    case "LOAD_USER":
      return {
        ...state,
        loggedIn: true,
        user: {
          ...action.payload,
        },
        admin: false,
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
    default:
      return state;
  }
};

export default auth;
