import React, { Component } from "react";
import ProjectList from "./ProjectList/ProjectList";
import RingLoader from "react-spinners/RingLoader";
import axios from "axios";

class ProjectsList extends Component<any, any> {
  state = {
    projects: [],
    loading: false,
    user: {},
  };

  componentDidMount() {
    let projectsRequest = axios.get(`http://localhost:5000/projects`);
    let userRequest = axios.get(
      `http://localhost:5000/students/auth/${this.props.userid}`
    );

    axios
      .all([projectsRequest, userRequest])
      .then(
        axios.spread((...responses) => {
          const projectsResponse = responses[0];
          const userResponse = responses[1];
          this.setState({
            ...this.state,
            projects: projectsResponse.data,
            user: userResponse.data[0],
            loading: false,
          });
        })
      )
      .catch((errors) => {
        console.log(errors);
      });
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
