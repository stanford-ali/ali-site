import axios from "axios";
import { loadingStart, loadingEnd, throwError } from "../base/base.actions";
import { LOAD_USER, UPDATE_USER, SIGN_OUT } from "./auth.types";

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

// Logout the user and reset user in store
export const logout = () => {
  return (dispatch) => {
    dispatch(signOut());
  };
};

// Put user in the store
export const loadUser = (user) => {
  return {
    type: LOAD_USER,
    payload: user,
  };
};

// Fetch the user object from DB
export const fetchUser = (uid) => {
  return (dispatch) => {
    dispatch(loadingStart());
    axios
      .get(`/users/${uid}`)
      .then((res) => {
        dispatch(loadUser(res.data[0]));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => dispatch(loadingEnd()));
  };
};

// Action creator that updates the redux user
export const updateUser = (newUser) => {
  return {
    type: UPDATE_USER,
    payload: newUser,
  };
};

// Updates the user to unfollow in the database
export const followProject = (projectid, user) => {
  user.following.push(projectid);
  return async (dispatch) => {
    await axios
      .patch(`/users/${user.uid}`, {
        following: user.following,
      })
      .then(() => dispatch(updateUser(user)))
      .catch((error) => {
        dispatch(throwError(error));
      });
  };
};

// Updates the user to follow in the database
export const unfollowProject = (projectid, user) => {
  user.following = user.following.filter((elem) => {
    return elem !== projectid;
  });

  return async (dispatch) => {
    await axios
      .patch(`/users/${user.uid}`, {
        following: user.following,
      })
      .then(() => dispatch(updateUser(user)))
      .catch((error) => {
        dispatch(throwError(error));
      });
  };
};

export const applyProject = (user_id, project_id, owner_id, answers) => {
  return (dispatch) => {
    dispatch(loadingStart());
    // Create application in applications collection, and update the user's application array
    axios
      .post(`/applications/user/${user_id}/project/${project_id}`, {
        answers,
        owner_id,
      })
      .then((res) => {})
      .catch((error) => {
        dispatch(throwError(error));
      })
      .finally(() => dispatch(loadingEnd()));
  };
};
