import React, { Component } from "react";
import ProjectList from "./ProjectList/ProjectList";
import axios from "axios";

class ProjectsList extends Component<any, any> {
  state = {
    projects: [],
  };

  componentDidMount() {
    axios
      .get(`http://localhost:5000/projects`)
      .then((res) => this.setState({ projects: res.data }));
  }

  render() {
    const questions = this.state.projects.map((elem, id) => {
      return (
        <ProjectList
          key={id}
          projectid={elem.id}
          title={elem.title}
          department={elem.department}
          desc={elem.desc}
          categ={elem.category.join(" ")}
          click={this.props.click}
        />
      );
    });
    return <div>{questions}</div>;
  }
}

export default ProjectsList;
