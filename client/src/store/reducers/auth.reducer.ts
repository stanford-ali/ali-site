import { Reducer } from "redux";
import {
  IAuthState,
  INITIALIZE_GAPI,
  SIGN_IN,
  SIGN_OUT,
} from "../types/auth.types";

const initialState: IAuthState = {
  authInstance: null,
  loggedIn: null,
  user: null,
  userId: null,
  admin: null,
  loading: true,
};

const auth: Reducer<any> = (state: any = initialState, action): any => {
  switch (action.type) {
    case INITIALIZE_GAPI:
      return {
        ...state,
        authInstance: action.payload,
      };
    case SIGN_IN:
      return {
        ...state,
        loggedIn: true,
        user: {
          firstname: action.payload.getGivenName(),
          lastname: action.payload.getFamilyName(),
          email: action.payload.getEmail(),
        },
        userId: action.payload.getId(),
        admin: false,
        loading: false,
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
