import {Reducer} from 'redux';
import {IAdminState, SET_APPLICATIONS} from '../types/admin.types';

const initialState: IAdminState = {
  applications: [],
  applicationStats: null,
  projectSubmissions: null
}

const admin: Reducer<any> = (state: any = initialState, action) => {
  switch (action.type) {
    case SET_APPLICATIONS:
      return {
        ...state,
        applications: action.application
      }
    default:
      return state
  }
};

export default admin;