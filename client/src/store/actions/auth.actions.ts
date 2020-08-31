import axios from "axios";

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
      .then((user) => dispatch(loadUser(user)))
      .catch((error) => console.log(error));
  };
};

export const login = (user) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:5000/student`)
      .then((user) => dispatch(loadUser(user)));
  };
};

export const logout = () => {
  // Reroute to home?
};

export const loadUser = (user) => {
  return {
    type: "LOAD_USER",
    payload: user,
  };
};

export const loadUserFailed = () => {
  return {
    type: "LOAD_USER_FAILED",
  };
};

export const updateFollowStart = () => {
  return {
    type: "UPDATE_FOLLOW_START",
  };
};

// Thunk that fetches user
export const fetchUser = (userid) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:5000/students/auth/${userid}`)
      .then((res) => {
        dispatch(loadUser(res.data[0]));
      })
      .catch((error) => {
        console.log(error);
        dispatch(loadUserFailed);
      });
  };
};

// Action creator that updates the redux user
export const updateUser = (newUser) => {
  return {
    type: "UPDATE_USER",
    payload: newUser,
  };
};

export const applyProjectStart = () => {
  return {
    type: "APPLY_PROJECT_START",
  };
};

// Thunk middleware that updates the user to unfollow in the database
export const followProject = (project, user) => {
  user.following.push(project);
  return async (dispatch) => {
    dispatch(updateFollowStart());
    await axios
      .put(`http://localhost:5000/students/auth/${user.google_id}`, user)
      .then(() => dispatch(updateUser(user)))
      .catch((error) => {
        console.log(error);
      });
  };
};

// Thunk middleware that updates the user to follow in the database
export const unfollowProject = (projectid, user) => {
  user.following = user.following.filter((elem) => {
    return elem.id !== projectid;
  });

  return async (dispatch) => {
    dispatch(updateFollowStart());
    await axios
      .put(`http://localhost:5000/students/auth/${user.google_id}`, user)
      .then(() => dispatch(updateUser(user)))
      .catch((error) => {
        console.log(error);
      });
  };
};

// Thunk middleware that updates the user's applications array
export const applyProject = (projectid, user) => {
  user.applications.push(projectid);
  return async (dispatch) => {
    dispatch(applyProjectStart());
    await axios
      .put(`http://localhost:5000/students/auth/${user.google_id}`, user)
      .then(() => dispatch(updateUser(user)))
      .catch((error) => {
        console.log(error);
      });
  };
};
