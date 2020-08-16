import React, { Component } from "react";
import ProjectsList from "./ProjectsList/ProjectsList";
import ProjectFocus from "./ProjectFocus/ProjectFocus";
import { GrProjects } from "react-icons/gr";
import { fetchProject } from "../../../store/actions/project.actions";
import { connect } from "react-redux";
import axios from "axios";
import "./ProjectsContainer.scss";

class ProjectsContainer extends Component<any, any> {
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
    user: {},
  };

  // Change so that ProjectFocus component shows
  changeProjSelected(id) {
    this.setState({
      projSelected: true,
      projectid: id,
    });
    this.props.onFetchProject(id);
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/students/auth/${this.props.userid}`)
      .then((res) => {
        this.setState({
          ...this.state,
          user: res.data[0],
        });
      })
      .catch((errors) => {
        console.log(errors);
      });
  }

  render() {
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
    );
  }
}

// Get state from redux
const mapStateToProps = (state) => {
  return {
    details: state.project.details,
    userid: state.auth.userId,
  };
};

// Actions
const mapDispatchToProps = (dispatch) => {
  return {
    // onProjectSelected: (project) => dispatch(selectProject(project)),
    onFetchProject: (projectid) => dispatch(fetchProject(projectid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer);
