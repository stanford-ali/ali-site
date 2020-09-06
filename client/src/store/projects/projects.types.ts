export const FETCH_PROJECT: string = "FETCH_PROJECT";
export const FETCH_PROJECTS: string = "FETCH_PROJECTS";
export const SUBMIT_APPLICATION: string = "SUBMIT_APPLICATION";
export const SELECT_PROJECT: string = "SELECT_PROJECT";
export const CHANGE_SEARCH: string = "CHANGE_SEARCH";
export const CHANGE_SORT: string = "CHANGE_SORT";
export const CHANGE_FILTERS: string = "CHANGE_FILTERS";
export const APPROVE_PROJECT: string = "APPROVE_PROJECT";

export interface IProject {
  id: string;
  title: string;
  description: string;
  timeframe: string;
  questions: [string];
  user: string;
  university: string;
  departments: [string];
  website: string;
  skills: [string];
  courses: [string];
  categories: [string];
  tags: [string];
  faculty_designed: boolean;
  self_designed: boolean;
}
