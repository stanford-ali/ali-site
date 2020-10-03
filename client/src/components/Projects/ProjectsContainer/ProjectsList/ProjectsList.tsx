import React, { Component } from "react";
import ProjectList from "./ProjectList/ProjectList";
// import Loader from "../../../GlobalUI/ModalLoader/ModalLoader";
import axios from "axios";
import { connect } from "react-redux";
import { fetchProjects } from "../../../../store/projects/projects.actions";

class ProjectsList extends Component<any, any> {
  componentDidMount() {
    this.props.onFetchProjects();
  }

  render() {
    const projects =
      this.props.projects &&
      this.props.projects.map((elem, id) => {
        return (
          <ProjectList
            key={id}
            projectid={elem._id}
            title={elem.title}
            departments={elem.departments}
            desc={elem.description}
            categ={elem.categories.join(" | ")}
            faculty={elem.faculty_designed}
            click={this.props.click}
          />
        );
      });
    return <div>{projects}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    projects: state.project.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProjects: () => dispatch(fetchProjects()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
