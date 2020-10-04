import axios from "axios";
import {
  LOAD_PROJECTS,
  CLICK_PROJECT,
  UPDATE_PROJECT,
  GET_APPLICATIONS,
} from "./profile.types";
import { loadingStart, loadingEnd, throwError } from "../base/base.actions";

export const loadProjects = (user_id) => (dispatch) => {
  dispatch(loadingStart());
  axios
    .get(`/projects/owner/${user_id}`)
    .then((res) => {
      dispatch({
        type: LOAD_PROJECTS,
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

export const clickProject = (project) => (dispatch) => {
  dispatch({ type: CLICK_PROJECT, payload: project });
};

export const updateProject = (project_id, body) => (dispatch) => {
  dispatch(loadingStart());
  axios
    .patch(`/projects/${project_id}`, {
      ...body,
    })
    .then((res) => dispatch({ type: UPDATE_PROJECT, payload: res.data }))
    .catch((error) => dispatch(throwError(error)))
    .then(() => loadingEnd());
};

export const updateDepartment = (project_id, newDepartments) => (dispatch) => {
  dispatch(loadingStart());
  axios
    .patch(`/projects/${project_id}`, {
      departments: newDepartments,
    })
    .then((res) => dispatch({ type: UPDATE_PROJECT, payload: res.data }))
    .catch((error) => dispatch(throwError(error)))
    .then(() => loadingEnd());
};

export const updateSkills = (project_id, newSkills) => (dispatch) => {
  dispatch(loadingStart());
  axios
    .patch(`/projects/${project_id}`, {
      skills: newSkills,
    })
    .then((res) => dispatch({ type: UPDATE_PROJECT, payload: res.data }))
    .catch((error) => dispatch(throwError(error)))
    .then(() => loadingEnd());
};

export const updateCourses = (project_id, newCourses) => (dispatch) => {
  dispatch(loadingStart());
  axios
    .patch(`/projects/${project_id}`, {
      courses: newCourses,
    })
    .then((res) => dispatch({ type: UPDATE_PROJECT, payload: res.data }))
    .catch((error) => dispatch(throwError(error)))
    .then(() => dispatch(loadingEnd()));
};

export const updateCategories = (project_id, newCategories) => (dispatch) => {
  dispatch(loadingStart());
  axios
    .patch(`/projects/${project_id}`, {
      categories: newCategories,
    })
    .then((res) => dispatch({ type: UPDATE_PROJECT, payload: res.data }))
    .catch((error) => dispatch(throwError(error)))
    .then(() => dispatch(loadingEnd()));
};

export const updateTags = (project_id, newTags) => (dispatch) => {
  dispatch(loadingStart());
  axios
    .patch(`/projects/${project_id}`, {
      tags: newTags,
    })
    .then((res) => dispatch({ type: UPDATE_PROJECT, payload: res.data }))
    .catch((error) => dispatch(throwError(error)))
    .then(() => dispatch(loadingEnd()));
};

export const getApplications = (project_id, user_id) => (dispatch) => {
  dispatch(loadingStart());
  axios
    .get(`/applications/user/${user_id}/selfproject/${project_id}`)
    .then((res) => dispatch({ type: GET_APPLICATIONS, payload: res.data }))
    .catch((error) => dispatch(throwError(error)))
    .then(() => loadingEnd());
};
