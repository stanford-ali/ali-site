import axios from "axios";
import { START_NEW_PROJECT, SUBMIT_PROJECT, SET_SCHEMA } from "./submit.types";
import { throwError } from "../base/base.actions";
import store from "../../store";

export const startNewProject = () => ({
  type: START_NEW_PROJECT,
});

export const setSchema = (schema) => (dispatch) => {
  const categories = store.getState().submit.categories;
  schema.properties.details.properties.categories.items.enum = categories;
  dispatch({
    type: SET_SCHEMA,
    payload: schema,
  });
};

const parseFormData = (owner, formData) => {
  const title = formData.details.title;
  const description = formData.details.description;
  const timeframe = formData.details.timeframe;
  const categories = formData.details.categories
    ? formData.details.categories
    : [];
  const tags = formData.details.tags
    ? formData.details.tags.map((obj) => obj.tag)
    : [];
  const courses = formData.preferences.courses
    ? formData.preferences.courses.map((obj) => obj.course)
    : [];
  const skills = formData.preferences.skills
    ? formData.preferences.skills.map((obj) => obj.skill)
    : [];
  const self_designed = formData.details.self_desgined;
  const university = formData.general.university;
  const departments = formData.general.departments.map((obj) => obj.department);
  const website = formData.general.website ? formData.general.website : "";
  const questions = formData.application.questions
    ? formData.application.questions.map((obj) => obj.question)
    : [];

  return {
    owner,
    title,
    description,
    timeframe,
    website,
    courses,
    skills,
    categories,
    tags,
    self_designed,
    university,
    departments,
    questions,
  };
};

export const submitProject = (owner, formData) => (dispatch) => {
  const data = parseFormData(owner, formData);
  axios
    .post("/projects", data)
    .then((res) => {
      dispatch({
        type: SUBMIT_PROJECT,
      });
    })
    .catch((error) => {
      dispatch(throwError(error));
    });
};
