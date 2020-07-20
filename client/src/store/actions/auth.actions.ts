import store from '../../store';
import {loadingStart, loadingEnd} from './base.actions';
import {INITIALIZE_GAPI, SIGN_IN, SIGN_OUT} from '../types/auth.types';
import axios from 'axios';

export const initializeGoogleSignIn = () => dispatch => {
  dispatch(loadingStart());
  window.gapi.load('auth2', () => {
    window.gapi.auth2.init({
      client_id: '206518429834-qpmlbht0e0t0gqa1kos5bmv9tt16f64g.apps.googleusercontent.com'
    })
      .then(() => {
        dispatch({
          type: INITIALIZE_GAPI,
          payload: window.gapi.auth2.getAuthInstance()
        });
      })
      .then(() => {
        dispatch(signIn())

        store.getState().auth.authInstance.isSignedIn.listen(isSignedIn => {
          if (isSignedIn) {
            dispatch(signIn());
          } // signedOut case handled by button onClick
        })
      })
      .catch(error => {
        console.log(error);
      });
  })
};

export const signIn = () => dispatch => {
  dispatch(loadingStart());
  const authInstance = store.getState().auth.authInstance;
  if (authInstance.isSignedIn.get()) {
    const currentUser = authInstance.currentUser.get().getBasicProfile();
    dispatch({
      type: SIGN_IN,
      payload: currentUser
    });
    
    axios.get(`http://localhost:5000/students/auth/${currentUser.getId()}`)
      .then(res => {
        if (!res.data.length) { // create new user in the database
          axios.post('http://localhost:5000/students', {
            google_id: currentUser.getId(),
            firstname: currentUser.getGivenName(),
            lastname: currentUser.getFamilyName(),
            email: currentUser.getEmail()
          })
          .then(res => {
            console.log(res.data);
          })
          .catch(error => {
            console.log(error);
          });
        }
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        dispatch(loadingEnd());
      });
  } else {
    dispatch(loadingEnd());
  }
};

export const logout = () => dispatch => {
  store.getState().auth.authInstance.signOut();
  dispatch({
    type: SIGN_OUT
  });
};