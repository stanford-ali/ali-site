import { Reducer } from "redux";
import { LOAD_USER, SIGN_UP, SIGN_OUT, UPDATE_USER } from "./auth.types";

const initialState = {
  user: null,
  signedIn: false,
  questions: [
    {
      question: "What university do you attend?",
      questionid: "university",
      textarea: false,
    },
    {
      question: "What year in school are you?",
      questionid: "year",
      textarea: false,
    },
    {
      question: "List general skills you have",
      questionid: "skills",
      textarea: true,
    },
    {
      question: "What programming languages do you have experience in?",
      questionid: "programming",
      textarea: true,
    },
    {
      question: "Attach resume",
      questionid: "resume",
      textarea: false,
    },
  ],
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
        signedinIn: true,
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
