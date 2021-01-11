import React, { Component } from "react";
import FollowProject from "./FollowProject/FollowProject";
import AppliedProject from "./AppliedProject/AppliedProject";
import ApproveProject from "./ApproveProject/ApproveProject";
import { connect } from "react-redux";
import "./Following.scss";
import axios from "axios";
import { updateProject } from "../../../../store/profile/profile.actions";

class Following extends Component<any, any> {
  state = {
    rightDisplay: "following",
    followingProjects: [],
    appliedProjects: [],
    approveProjects: [],
  };

  async componentDidMount() {
    // Get followed projects
    for (let project of this.props.user.following) {
      await axios
        .get(`/projects/${project}`)
        .then((res) =>
          this.setState({
            followingProjects: [...this.state.followingProjects, res.data[0]],
          })
        )
        .catch((error) => console.log(error));
    }

    // Get applied projects
    await axios
      .get(`/applications/user/${this.props.user.uid}`)
      .then((res) => this.setState({ appliedProjects: res.data }))
      .catch((error) => console.log(error));

    // Get approval projects
    await axios
      .get(`/projects/pending`)
      .then((res) => this.setState({ approveProjects: res.data }))
      .catch((error) => console.log(error));
  }

  onRightDisplayChange(title) {
    this.setState({ rightDisplay: title });
  }

  render() {
    // Update to adhere to new applications backend
    const applied = this.state.appliedProjects.map((elem, id) => {
      return (
        <AppliedProject
          key={id}
          title={elem.project_id.title}
          university={elem.project_id.university}
          departments={elem.project_id.departments}
          faculty={elem.project_id.faculty_designed}
          owner={elem.project_id.owner}
          questions={elem.project_id.questions}
          projectid={elem.project_id._id}
          answers={elem.answers}
        />
      );
    });

    // All the projects a user is following
    const following = this.state.followingProjects.map((elem, id) => {
      return (
        <FollowProject
          key={id}
          title={elem.title}
          department={elem.departments}
          category={elem.categories}
          faculty={elem.faculty_designed}
          projectid={elem._id}
        />
      );
    });

    // Approve the project
    const approveProject = (event, project_id, key) => {
      event.preventDefault();
      let body = {};
      body["approved"] = true;
      this.props.onUpdateProject(project_id, body);

      // Update the backend and update state if successful
      axios
        .patch(`/projects/${project_id}`, {
          ...body,
        })
        .then((res) => {
          let copyApproveProjects = [...this.state.approveProjects];
          copyApproveProjects.splice(key, 1);
          this.setState({
            approveProjects: copyApproveProjects,
          });
        })
        .catch((error) => console.log(error));
    };

    const approve = this.state.approveProjects.map((elem, id) => {
      return (
        <ApproveProject
          approve={approveProject}
          key={id}
          index={id}
          {...elem}
        />
      );
    });

    const selectedStyle = { color: "#303030" };

    return (
      <div className="Following">
        <div className="FollowingHead">
          <button
            onClick={() => this.onRightDisplayChange("following")}
            style={
              this.state.rightDisplay === "following" ? selectedStyle : null
            }
          >
            Following
          </button>
          <button
            onClick={() => this.onRightDisplayChange("applied")}
            style={this.state.rightDisplay === "applied" ? selectedStyle : null}
          >
            Applied
          </button>
          {this.props.user.admin && (
            <button
              onClick={() => this.onRightDisplayChange("approve")}
              style={
                this.state.rightDisplay === "approve" ? selectedStyle : null
              }
            >
              Approve
            </button>
          )}
        </div>
        {this.state.rightDisplay === "following"
          ? following
          : this.state.rightDisplay === "applied"
          ? applied
          : approve}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateProject: (project_id, body) =>
      dispatch(updateProject(project_id, body)),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Following);
