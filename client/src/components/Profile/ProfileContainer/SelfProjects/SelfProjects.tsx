import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./SelfProjects.scss";

class SelfProjects extends Component<any, any> {
  state = {
    ownedApplications: [],
  };

  componentDidMount() {
    // Get Applications By Owner
    const uid = this.props.user.uid;
    axios
      .get(`http://localhost:5000/applications/owner/${uid}`)
      .then((res) => this.setState({ ownedApplications: res.data }))
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="SelfProjects">
        <div className="SelfProjectsHead">
          <h3 style={{ color: "white" }}>My Projects</h3>
        </div>
        <div className="SelfProjectsContent">Content</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(SelfProjects);
