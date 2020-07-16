export const INITIALIZE_GAPI: string = 'INITIALIZE_GAPI';
export const SIGN_IN: string = 'SIGN_IN';
export const SIGN_OUT: string = 'SIGN_OUT';


export interface IUser {
  firstname: string,
  lastname: string,
  email: string,
}

export interface IAuthState {
  authInstance: any,
  loggedIn: boolean,
  user: IUser,
  userId: string,
  admin: boolean,
}