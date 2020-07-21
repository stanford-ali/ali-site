import {Reducer} from 'redux';
import {IBaseState, LOADING_START, LOADING_END} from '../types/base.types';

const initialState: IBaseState = {
  loading: false
};

const base: Reducer<any> = (state: any = initialState, action) => {
  switch (action.type) {
    case LOADING_START:
      return {
        ...state,
        loading: true
      };
    case LOADING_END:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default base;