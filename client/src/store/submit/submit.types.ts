import { JSONSchema7 } from "json-schema";

export const START_NEW_PROJECT: string = "START_NEW_PROJECT";
export const SUBMIT_PROJECT: string = "SUBMIT_PROJECT";
export const SET_SCHEMA: string = "SET_SCHEMA";

export interface ISubmitState {
  submitted: boolean;
  categories: string[];
  schema: JSONSchema7;
}
