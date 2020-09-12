import React, { Component } from "react";
import ProjectList from "./ProjectList/ProjectList";
// import Loader from "../../../GlobalUI/ModalLoader/ModalLoader";
import axios from "axios";
import { connect } from "react-redux";

class ProjectsList extends Component<any, any> {
  state = {
    projects: [],
  };

  componentDidMount() {
    axios
      .get(`http://localhost:5000/projects`, { params: { verify: false } })
      .then((res) =>
        this.setState({
          ...this.state,
          projects: res.data,
        })
      )
      .catch((error) => console.log(error));
  }

  render() {
    const projects = this.state.projects.map((elem, id) => {
      return (
        <ProjectList
          key={id}
          projectid={elem._id}
          title={elem.title}
          departments={elem.departments}
          desc={elem.description}
          categ={elem.categories.join(" | ")}
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
  };
};

export default connect(mapStateToProps, null)(ProjectsList);
