import { Reducer } from "redux";
import {
  IProject,
  LOAD_PROJECTS,
  CLICK_PROJECT,
  UPDATE_PROJECT,
  GET_APPLICATIONS,
} from "./profile.types";

const initialState = {
  ownedProjects: [],
  selfProjectSelected: false,
  selfProjectApplicationsSelected: false,
  selectedProject: null,
  selfProjectApplications: [],
};

const profile: Reducer<any> = (state: any = initialState, action) => {
  switch (action.type) {
    case LOAD_PROJECTS:
      return {
        ...state,
        ownedProjects: action.payload,
      };
    case CLICK_PROJECT:
      return {
        ...state,
        selfProjectSelected: true,
        selfProjectApplicationsSelected: false,
        selectedProject: action.payload as IProject,
      };
    case UPDATE_PROJECT:
      return {
        ...state,
        selectedProject: action.payload as IProject,
      };
    case GET_APPLICATIONS:
      return {
        ...state,
        selfProjectApplications: action.payload,
        selfProjectSelected: false,
        selfProjectApplicationsSelected: true,
      };
    default:
      return state;
  }
};

export default profile;
