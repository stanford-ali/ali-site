import React, { Component } from "react";
import ProjectList from "./ProjectList/ProjectList";
import RingLoader from "react-spinners/RingLoader";
import axios from "axios";

class ProjectsList extends Component<any, any> {
  state = {
    projects: [],
    loading: false,
  };

  componentDidMount() {
    axios
      .get(`http://localhost:5000/projects`)
      .then((res) =>
        this.setState({
          ...this.state,
          projects: res.data,
          loading: false,
        })
      )
      .catch((error) => console.log(error));
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
    return (
      <div>
        {this.state.loading ? <RingLoader color="#3246bb" /> : questions}
      </div>
    );
  }
}

export default ProjectsList;
