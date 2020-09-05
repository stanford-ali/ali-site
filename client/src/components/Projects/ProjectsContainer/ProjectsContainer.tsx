import React, { Component } from "react";
import ProjectsList from "./ProjectsList/ProjectsList";
import ProjectFocus from "./ProjectFocus/ProjectFocus";
import { GrProjects } from "react-icons/gr";
import { connect } from "react-redux";
import qs from "qs";
import "./ProjectsContainer.scss";
import { fetchProject } from "../../../store/projects/projects.actions";

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
  };

  // Change so that ProjectFocus component shows
  changeProjSelected(id) {
    this.setState({
      projSelected: true,
      projectid: id,
    });
    this.setQueryString(id);
    this.props.onFetchProject(id);
  }

  // Sets the URL's query string when a user selects a project
  setQueryString(projectid) {
    let query_string = qs.stringify(
      {
        search: projectid,
      },
      {
        encode: false,
        indices: false,
      }
    );
    if (query_string !== "") {
      query_string = `?${query_string}`;
    }
    window.history.replaceState({}, "", `/projects/${query_string}`);
  }

  componentDidMount() {
    if (window.location.search) {
      // We have a query param for a project
      let params = qs.parse(window.location.search.substring(1), {
        encode: false,
        indices: false,
      });
      this.setState({ projSelected: true, projectid: params.search });

      // Update this.props.details so information can be displayed
      this.props.onFetchProject(params.search);
    }
  }

  render() {
    const focusFiller = !this.props.user ? null : (
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
            <ProjectFocus {...this.props.current_project} />
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
    current_project: state.project.current_project,
    user: state.auth.user,
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
