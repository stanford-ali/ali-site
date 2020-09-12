import React from "react";
import { useHistory } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { connect } from "react-redux";
import { unfollowProject } from "../../../../../store/auth/auth.actions";
import "./FollowProject.scss";

function FollowProject(props) {
  const history = useHistory();

  // Onclick handler to unfollow project
  const unfollowProject = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    await props.onUnfollowProject(props.projectid, props.user);
  };

  const selectProject = (event) => {
    history.push(`/projects/?search=${props.projectid}`);
  };

  return (
    <div className="FollowProjects">
      <li className="Title">
        <div onClick={selectProject}>{props.title}</div>
        <div>
          <button className="UnfollowProject" onClick={unfollowProject}>
            <AiOutlineClose
              color="#ff7070"
              size={25}
              style={{ pointerEvents: "none" }}
            />
          </button>
        </div>
      </li>
      <ul className="ProjectCaption">
        <li className="Department">
          <p>{props.department}</p>
        </li>
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

// Actions
const mapDispatchToProps = (dispatch) => {
  return {
    onUnfollowProject: (projectid, user) =>
      dispatch(unfollowProject(projectid, user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FollowProject);
