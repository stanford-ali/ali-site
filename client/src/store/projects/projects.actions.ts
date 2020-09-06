import axios from "axios";
import {
  FETCH_PROJECT,
  FETCH_PROJECTS,
  SUBMIT_APPLICATION,
} from "./projects.types";
import { loadingStart, loadingEnd } from "../base/base.actions";

export const fetchProject = (project_id) => (dispatch) => {
  dispatch(loadingStart());
  axios
    .get(`http://localhost:5000/projects/${project_id}`)
    .then((res) => {
      dispatch({
        type: FETCH_PROJECT,
        payload: res.data[0],
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      dispatch(loadingEnd());
    });
};

export const fetchProjects = () => (dispatch) => {
  dispatch(loadingStart());
  axios
    .get("http://localhost:5000/projects?approved=true")
    .then((res) => {
      dispatch({
        type: FETCH_PROJECTS,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      dispatch(loadingEnd());
    });
};
