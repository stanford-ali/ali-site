import React, { Component } from "react";
import { connect } from "react-redux";
import SelfProject from "./SelfProject/SelfProject";
import SelfProjectFocus from "./SelfProjectFocus/SelfProjectFocus";
import axios from "axios";
import "./SelfProjects.scss";
import { GrProjects } from "react-icons/gr";

class SelfProjects extends Component<any, any> {
  constructor(props) {
    super(props);

    this.handleProjectClick = this.handleProjectClick.bind(this);
  }
  state = {
    ownedProjects: [],
    selfProjectSelected: false,
    selectedProject: null,
  };

  componentDidMount() {
    // Get Applications By Owner
    const uid = this.props.user.uid;
    axios
      .get(`http://localhost:5000/projects/owner/${uid}`)
      .then((res) => this.setState({ ownedProjects: res.data }))
      .catch((error) => console.log(error));
  }

  handleProjectClick(project) {
    console.log("project clicked");
    this.setState({ selfProjectSelected: true, selectedProject: project });
  }

  render() {
    const focusFiller = (
      <div className="FocusFillerSelfProject">
        <div
          style={{
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
          }}
        >
          <GrProjects color={"gray"} size={25} />
          <p>Select a project...</p>
        </div>
      </div>
    );

    const selfProjects = this.state.ownedProjects.map((elem, id) => {
      return (
        <SelfProject
          key={id}
          click={() => this.handleProjectClick(elem)}
          {...elem}
        />
      );
    });

    return (
      <div className="SelfProjects">
        <div className="SelfProjectsHead">
          <h3 style={{ color: "white" }}>My Projects</h3>
        </div>
        <div className="SelfProjectsContent">
          <div className="SelfProjectsCards">{selfProjects}</div>
          <div className="SelfProjectsFocus">
            {!this.state.selfProjectSelected ? (
              focusFiller
            ) : (
              <SelfProjectFocus {...this.state.selectedProject} />
            )}
          </div>
        </div>
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
