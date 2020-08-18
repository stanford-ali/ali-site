import React from "react";
import { FaDna } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { connect } from "react-redux";
import { unfollowProject } from "../../../../../store/actions/auth.actions";
import "./FollowProject.scss";

function FollowProject(props) {
  // Onclick handler to unfollow project
  const unfollowProject = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    await props.onUnfollowProject(props.projectid, props.user);
  };
  return (
    <div className="FollowProjects">
      <li className="Title">
        <div>
          <FaDna style={{ marginRight: "5px" }} />
          {props.title}
        </div>

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
