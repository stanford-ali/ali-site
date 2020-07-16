import {Reducer} from 'redux';
import {IAdminState, SET_APPLICATIONS} from '../types/admin.types';

const initialState: IAdminState = {
  applications: [],
  applicationStats: null,
  projectSubmissions: null
}

const admin: Reducer<any> = (state: any = initialState, actions) => {
  switch (actions.type) {
    case SET_APPLICATIONS:
      return {
        ...state,
        applications: actions.application
      }
    default:
      return state
  }
};

export default admin;