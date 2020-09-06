import axios from "axios";
import { loadingStart, loadingEnd } from "../base/base.actions";
import { LOAD_USER, UPDATE_USER, SIGN_OUT } from "./auth.types";

// NOT NEEDED ANYMORE BECAUSE FIREBASEUI HANDLES IT //
export const signup = (user) => {
  return (dispatch) => {
    // Modify user here to store in database here
    const newUser = {
      firebaseid: user.user.uid,
      email: user.user.email,
      firstname: user.firstName,
      lastname: user.lastName,
      image: "",
      qna: {},
      applications: [],
      following: [],
    };

    // Axios request to signup
    axios
      .post("http://localhost:5000/students", newUser)
      .then((res) => dispatch(loadUser(res.data[0])))
      .catch((error) => console.log(error));
  };
};

// ALSO HANDLED BY FIREBASE UI //
export const login = (user) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:5000/student`)
      .then((user) => dispatch(loadUser(user)));
  };
};

// Logout the user and reset user in store
export const logout = () => {
  return {
    type: SIGN_OUT,
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
    axios
      .get(`http://localhost:5000/users/${uid}`)
      .then((res) => {
        dispatch(loadUser(res.data[0]));
      })
      .catch((error) => {
        console.log(error);
      });
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
      .patch(`http://localhost:5000/users/${user.uid}`, {
        following: user.following,
      })
      .then(() => dispatch(updateUser(user)))
      .catch((error) => {
        console.log(error);
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
      .patch(`http://localhost:5000/users/${user.uid}`, {
        following: user.following,
      })
      .then(() => dispatch(updateUser(user)))
      .catch((error) => {
        console.log(error);
      });
  };
};

export const applyProject = (user_id, project_id, owner_id, answers) => {
  return (dispatch) => {
    dispatch(loadingStart);
    // Create application in applications collection, and update the user's application array
    axios
      .post(
        `http://localhost:5000/applications/user/${user_id}/project/${project_id}`,
        { answers, owner_id }
      )
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      })
      .then(dispatch(loadingEnd));
  };
};
