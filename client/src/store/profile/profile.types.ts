export const LOAD_PROJECTS: string = "LOAD_PROJECTS";
export const CLICK_PROJECT: string = "CLICK_PROJECT";
export const ADD_DEPARTMENT: string = "ADD_DEPARTMENT";
export const DELETE_DEPARTMENT: string = "DELETE_DEPARTMENT";
export const ADD_SKILLS: string = "ADD_SKILLS";
export const DELETE_SKILLS: string = "DELETE_SKILLS";
export const ADD_COURSES: string = "ADD_COURSES";
export const DELETE_COURSES: string = "DELETE_COURSES";
export const ADD_TAGS: string = "ADD_TAGS";
export const DELETE_TAGS: string = "DELETE_TAGS";
export const ADD_CATEGORIES: string = "ADD_CATEGORIES";
export const DELETE_CATEGORIES: string = "DELETE_CATEGORIES";
export const UPDATE_PROJECT: string = "UPDATE_PROJECT";
export const GET_APPLICATIONS: string = "GET_APPLICATIONS";

export interface IProject {
  id: string;
  title: string;
  description: string;
  timeframe: string;
  questions: string[];
  user: string;
  university: string;
  departments: string[];
  website: string;
  skills: string[];
  courses: string[];
  categories: string[];
  tags: string[];
  faculty_designed: boolean;
  self_designed: boolean;
}
