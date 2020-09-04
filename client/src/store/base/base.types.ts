export const LOADING_START: string = "LOADING_START";
export const LOADING_END: string = "LOADING_END";
export const SET_REDIRECT: string = "SET_REDIRECT";
export const THROW_ERROR: string = "THROW_ERROR";

export interface IBaseState {
  loading: boolean;
  redirect: string;
  error: any;
}
