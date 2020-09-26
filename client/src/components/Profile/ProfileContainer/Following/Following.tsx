import React, { Component } from "react";
import FollowProject from "./FollowProject/FollowProject";
import AppliedProject from "./AppliedProject/AppliedProject";
import { connect } from "react-redux";
import "./Following.scss";
import axios from "axios";

class Following extends Component<any, any> {
  state = {
    rightDisplay: "following",
    followingProjects: [],
    appliedProjects: [],
  };

  async componentDidMount() {
    // Get followed projects
    for (let project of this.props.user.following) {
      await axios
        .get(`http://localhost:5000/projects/${project}`)
        .then((res) =>
          this.setState({
            followingProjects: [...this.state.followingProjects, res.data[0]],
          })
        )
        .catch((error) => console.log(error));
    }

    // Get applied projects
    await axios
      .get(`http://localhost:5000/applications/user/${this.props.user.uid}`)
      .then((res) => this.setState({ appliedProjects: res.data }))
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
        </div>
        {this.state.rightDisplay === "following" ? following : applied}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(Following);
