import React, { Component } from "react";
import ProjectsList from "./ProjectsList/ProjectsList";
import ProjectFocus from "./ProjectFocus/ProjectFocus";
import { GrProjects } from "react-icons/gr";
import { connect } from "react-redux";
import qs from "qs";
import "./ProjectsContainer.scss";
import { fetchProject } from "../../../store/projects/projects.actions";
import { applyProject } from "../../../store/auth/auth.actions";
import ModalLoader from "../../GlobalUI/ModalLoader/ModalLoader";
import axios from "axios";

class ProjectsContainer extends Component<any, any> {
  constructor(props) {
    super(props);
    this.changeProjSelected = this.changeProjSelected.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * projSelected - whether there is a project chosen to display
   * applied - whether user has applied or not applied to the selected project
   */
  state = {
    projSelected: false,
    applied: false,
  };

  async componentDidMount() {
    if (window.location.search) {
      // We have a query param for a project
      let params = qs.parse(window.location.search.substring(1), {
        encode: false,
        indices: false,
      });
      this.setState({ projSelected: true, projectid: params.search });

      // Update this.props.current_project
      await this.props.onFetchProject(params.search);
    }
  }

  /**
   * Manages purple highlighting of the boxes when focused and
   * loading if a user has applied to a project
   * @param prevProps
   * @param prevState
   */
  componentDidUpdate(prevProps, prevState) {
    if (this.props.current_project !== prevProps.current_project) {
      if (prevProps.current_project) {
        // Reset the border of the old project
        const oldProjectId = prevProps.current_project._id;
        const oldProject = document.getElementById(oldProjectId);
        if (oldProject) {
          oldProject.style.border = "1px solid rgba(0, 0, 0, 0.125)";
        }
      }

      // Update the border of the selected project
      const projectid = this.props.current_project._id;
      const project = document.getElementById(projectid);
      if (project) {
        project.style.border = "1px solid #3246bb";
      }
    }

    // User is established/logged in
    if (this.props.user !== prevProps.user) {
      // See if the user has applied to that project if there is a current project
      this.props.current_project &&
        axios
          .get(
            `/applications/user/${this.props.user.uid}/project/${this.props.current_project._id}`
          )
          .then((res) =>
            res.data
              ? this.setState({ applied: true })
              : this.setState({ applied: false })
          )
          .catch((error) => console.log(error));
    }
  }

  // Change so that ProjectFocus component shows
  async changeProjSelected(id) {
    this.setState({
      projSelected: true,
      projectid: id,
    });
    this.setQueryString(id);
    await this.props.onFetchProject(id);

    // See if the user has applied to that project
    this.props.user &&
      (await axios
        .get(
          `/applications/user/${this.props.user.uid}/project/${this.props.current_project._id}`
        )
        .then((res) =>
          res.data
            ? this.setState({ applied: true })
            : this.setState({ applied: false })
        )
        .catch((error) => console.log(error)));
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

  async handleSubmit(event) {
    event.preventDefault();
    // If there is no user, alert them that they need to login
    if (!this.props.user) {
      alert("Please login to apply to projects!");
      return;
    }

    let inputs = event.target.elements;
    let answers = [];
    for (let i = 0; i < inputs.length - 1; i++) {
      answers.push(inputs[i].value);
    }

    await this.props.onApplyProject(
      this.props.user.uid,
      this.props.current_project._id,
      this.props.current_project.owner,
      answers
    );
    this.setState({ applied: true });
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
        {this.props.loading && <ModalLoader />}
        <div className="ProjectsContainerLeft">
          <ProjectsList click={this.changeProjSelected} />
        </div>
        <div className="ProjectsContainerRight">
          {this.state.projSelected ? (
            <ProjectFocus
              applied={this.state.applied}
              onSubmit={this.handleSubmit}
              {...this.props.current_project}
            />
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
    loading: state.base.loading,
  };
};

// Actions
const mapDispatchToProps = (dispatch) => {
  return {
    // onProjectSelected: (project) => dispatch(selectProject(project)),
    onFetchProject: (projectid) => dispatch(fetchProject(projectid)),
    onApplyProject: (user_id, project_id, owner_id, answers) =>
      dispatch(applyProject(user_id, project_id, owner_id, answers)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer);
