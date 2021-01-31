import axios from "axios";
import {
  FETCH_PROJECT,
  FETCH_PROJECTS,
  // SUBMIT_APPLICATION,
} from "./projects.types";
import { loadingStart, loadingEnd, throwError } from "../base/base.actions";

export const fetchProject = (project_id) => async (dispatch) => {
  dispatch(loadingStart());
  await axios
    .get(`/api/projects/${project_id}`)
    .then((res) => {
      dispatch({
        type: FETCH_PROJECT,
        payload: res.data[0],
      });
    })
    .catch((error) => {
      dispatch(throwError(error));
    })
    .then(() => {
      dispatch(loadingEnd());
    });
};

export const fetchProjects = () => (dispatch) => {
  dispatch(loadingStart());
  axios
    .get("/api/projects")
    .then((res) => {
      dispatch({
        type: FETCH_PROJECTS,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch(throwError(error));
    })
    .then(() => {
      dispatch(loadingEnd());
    });
};
