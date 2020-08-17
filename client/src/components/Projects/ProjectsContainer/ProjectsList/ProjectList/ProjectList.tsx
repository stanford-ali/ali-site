import React, { Component } from "react";
import { AiOutlinePlus, AiOutlineCheck, AiOutlineMinus } from "react-icons/ai";
import { Card, Tooltip, OverlayTrigger } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchProject } from "../../../../../store/actions/project.actions";
import {
  followProject,
  unfollowProject,
} from "../../../../../store/actions/auth.actions";
import MoonLoader from "react-spinners/MoonLoader";
import axios from "axios";
import "./ProjectList.scss";

class ProjectList extends Component<any, any> {
  // Onclick handler to follow project
  followProject = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    await this.props.onFetchProject(event.target.id);
    await this.props.onFollowProject(this.props.details, this.props.user);
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

    // An array of project id's the user is following
    let followingids =
      this.props.user &&
      this.props.user.following.map((elem) => {
        return elem.id;
      });

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
      followingids && followingids.includes(this.props.projectid)
        ? unfollowButton
        : followButton;

    const description = `${this.props.desc
      .split(" ")
      .slice(0, 20)
      .join(" ")}. . .`;

    return (
      <Card
        className="ProjectCard"
        onClick={() => this.props.click(this.props.projectid)}
      >
        <Card.Header as="h6">
          {this.props.categ || `Biology | Computer Science`}
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
                  <OverlayTrigger
                    placement="left"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                  >
                    <AiOutlineCheck color={"green"} size={20} />
                  </OverlayTrigger>
                </div>
                {followUnfollowButton}
              </div>
            </Card.Title>
          </div>
          <Card.Text>
            {this.props.department} <br />
            {description}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    details: state.project.details,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProject: (projectid) => dispatch(fetchProject(projectid)),
    onFollowProject: (project, user) => dispatch(followProject(project, user)),
    onUnfollowProject: (projectid, user) =>
      dispatch(unfollowProject(projectid, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
