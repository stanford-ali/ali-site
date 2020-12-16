import { Reducer } from "redux";
import { LOAD_USER, SIGN_UP, SIGN_OUT, UPDATE_USER } from "./auth.types";

const initialState = {
  user: null,
  signedIn: false,
  loading: false,
  questions: {
    university: {
      question: "What university do you attend?",
      textarea: false,
    },
    year: {
      question: "What year in school are you?",
      textarea: false,
    },
    skills: {
      question: "List general skills you have",
      textarea: true,
    },
    programming: {
      question: "What programming languages do you have experience in?",
      textarea: true,
    },
  },
};

const auth: Reducer<any> = (state: any = initialState, action): any => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        user: action.payload,
      };
    case LOAD_USER:
      return {
        ...state,
        signedIn: true,
        user: {
          ...action.payload,
        },
      };
    case SIGN_OUT:
      return {
        ...state,
        user: null,
        signedIn: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default auth;
