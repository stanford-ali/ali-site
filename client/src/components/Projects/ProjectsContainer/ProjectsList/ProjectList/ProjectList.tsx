import React, { Component } from "react";
import { AiOutlinePlus, AiOutlineCheck, AiOutlineMinus } from "react-icons/ai";
import { RiUserStarLine } from "react-icons/ri";
import { Card, Tooltip, OverlayTrigger } from "react-bootstrap";
import { connect } from "react-redux";
import "./ProjectList.scss";
import { fetchProject } from "../../../../../store/projects/projects.actions";
import {
  followProject,
  unfollowProject,
} from "../../../../../store/auth/auth.actions";

class ProjectList extends Component<any, any> {
  // Onclick handler to follow project
  followProject = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    // If there is no user, alert the user that they cannot follow
    if (!this.props.user) {
      alert("Please login to follow projects!");
      return;
    }

    await this.props.onFollowProject(this.props.projectid, this.props.user);
  };

  // Onclick handler to unfollow project
  unfollowProject = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    await this.props.onUnfollowProject(event.target.id, this.props.user);
  };

  render() {
    const renderTooltip = (props) => {
      const { pid, ...rest } = props;
      return (
        <Tooltip id="button-tooltip" {...rest}>
          Verified
        </Tooltip>
      );
    };

    const followButton = (
      <button
        className="FollowButton"
        id={this.props.projectid}
        onClick={this.followProject}
      >
        <AiOutlinePlus style={{ pointerEvents: "none" }} />
      </button>
    );

    const unfollowButton = (
      <button
        className="FollowButton"
        id={this.props.projectid}
        onClick={this.unfollowProject}
      >
        <AiOutlineMinus style={{ pointerEvents: "none" }} />
      </button>
    );

    let followUnfollowButton =
      this.props.user &&
      this.props.user.following.includes(this.props.projectid)
        ? unfollowButton
        : followButton;

    const description = `${this.props.desc
      .split(" ")
      .slice(0, 20)
      .join(" ")}. . .`;

    const departments = `${this.props.departments.join(" ")}`;
    return (
      <Card
        className="ProjectCard"
        id={this.props.projectid}
        onClick={() => this.props.click(this.props.projectid)}
        // style={{ pointerEvents: this.props.applied ? "none" : "auto" }}
      >
        <Card.Header as="h6" className="CardHead">
          {this.props.categ}
          {this.props.faculty ? (
            <span className="AppliedHeader">
              <OverlayTrigger
                placement="left"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <RiUserStarLine size={20} />
              </OverlayTrigger>
            </span>
          ) : null}
        </Card.Header>
        <Card.Body>
          <div className="ProjectListTitle">
            <Card.Title
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {this.props.title}
              <div className="ProjectCardButtons">
                <div style={{ display: "flex", alignItems: "center" }}>
                  {this.props.applied && (
                    <AiOutlineCheck color={"green"} size={20} />
                  )}
                </div>
                {followUnfollowButton}
              </div>
            </Card.Title>
          </div>
          <Card.Text style={{ fontSize: "18px" }}>{departments}</Card.Text>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    current_project: state.project.current_project,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProject: (projectid) => dispatch(fetchProject(projectid)),
    onFollowProject: (projectid, user) =>
      dispatch(followProject(projectid, user)),
    onUnfollowProject: (projectid, user) =>
      dispatch(unfollowProject(projectid, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
