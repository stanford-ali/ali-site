import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import ProjectsList from "./ProjectsList/ProjectsList";
import ProjectFocus from "./ProjectFocus/ProjectFocus";
import { GrProjects } from "react-icons/gr";
import {
  selectProject,
  fetchProject,
} from "../../store/actions/project.actions";
import CircleLoader from "react-spinners/CircleLoader";
import { connect } from "react-redux";

class Projects extends Component<any, any> {
  constructor(props) {
    super(props);

    this.changeProjSelected = this.changeProjSelected.bind(this);
  }

  /**
   * projSelected - whether there is a project chosen to display
   * projProps - the props for a focused project (title, desc, etc)
   */
  state = {
    projSelected: false,
    projectid: "",
  };

  // Change so that ProjectFocus component shows
  changeProjSelected(id) {
    this.setState({
      projSelected: true,
      projectid: id,
    });
    this.props.onFetchProject(id);
  }

  render() {
    console.log(this.props.details);

    const focusFiller = (
      <div className="FocusFiller">
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
    return (
      <div>
        <Navbar />
        <div className="ProjectsContainer">
          <div className="ProjectsContainerLeft">
            <ProjectsList click={this.changeProjSelected} />
          </div>
          <div className="ProjectsContainerRight">
            {this.state.projSelected ? (
              <ProjectFocus {...this.props.details} />
            ) : (
              focusFiller
            )}
          </div>
        </div>
      </div>
    );
  }
}

// Get state from redux
const mapStateToProps = (state) => {
  return {
    details: state.project.details,
  };
};

// Actions
const mapDispatchToProps = (dispatch) => {
  return {
    onProjectSelected: (project) => dispatch(selectProject(project)),
    onFetchProject: (projectid) => dispatch(fetchProject(projectid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
