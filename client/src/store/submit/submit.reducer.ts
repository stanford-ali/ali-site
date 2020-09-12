import { Reducer } from "redux";
import {
  ISubmitState,
  START_NEW_PROJECT,
  SUBMIT_PROJECT,
  SET_SCHEMA,
} from "./submit.types";
import { JSONSchema7 } from "json-schema";

const initialState: ISubmitState = {
  submitted: false,
  // can move this to projects reducer
  categories: [
    "Biology",
    "Chemistry",
    "Computer Science",
    "Machine Learning",
    "Physics",
  ],
  schema: {},
};

const submit: Reducer<any> = (state: any = initialState, action) => {
  switch (action.type) {
    case START_NEW_PROJECT:
      return {
        ...state,
        submitted: false,
      };
    case SUBMIT_PROJECT:
      return {
        ...state,
        submitted: true,
      };
    case SET_SCHEMA:
      return {
        ...state,
        schema: action.payload as JSONSchema7,
      };
    default:
      return state;
  }
};

export default submit;
