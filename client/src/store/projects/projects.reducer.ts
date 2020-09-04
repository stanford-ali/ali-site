import { Reducer } from "redux";
import {
  IProject,
  FETCH_PROJECT,
  FETCH_PROJECTS,
  SELECT_PROJECT,
  APPROVE_PROJECT,
  SUBMIT_APPLICATION,
} from "./projects.types";

const initialState = {
  current_project: null,
  projects: null,
  categories: null,
  sort: null,
  filters: null,
  search: null,
};

const project: Reducer<any> = (state: any = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECT:
      return {
        ...state,
        current_project: action.payload as IProject,
      };
    case SELECT_PROJECT:

    case FETCH_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case APPROVE_PROJECT:
    case SUBMIT_APPLICATION:
    default:
      return state;
  }
};

export default project;
