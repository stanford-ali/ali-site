import axios from "axios";

export const selectProject = (project) => {
  return {
    type: "SELECT_PROJECT",
    project: project,
  };
};

export const fetchProjectFailed = () => {
  return {
    type: "FETCH_PROJECT_FAIL",
  };
};

export const fetchProject = (projectid) => {
  return (dispatch) => {
    // Execute async code
    axios
      .get(`http://localhost:5000/projects/${projectid}`)
      .then((res) => {
        dispatch(selectProject(res.data[0]));
      })
      .catch((error) => {
        dispatch(fetchProjectFailed());
      });
  };
};
