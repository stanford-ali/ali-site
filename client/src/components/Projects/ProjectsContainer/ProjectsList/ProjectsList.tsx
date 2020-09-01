import React, { Component } from "react";
import ProjectList from "./ProjectList/ProjectList";
import Loader from "../../../GlobalUI/ModalLoader/ModalLoader";
import axios from "axios";
import { connect } from "react-redux";

class ProjectsList extends Component<any, any> {
  state = {
    projects: [],
  };

  componentDidMount() {
    axios
      .get(`http://localhost:5000/projects`)
      .then((res) =>
        this.setState({
          ...this.state,
          projects: res.data,
        })
      )
      .catch((error) => console.log(error));
  }

  render() {
    // The application ids of the projects a user has applied to
    const applied =
      this.props.user &&
      this.props.user.applications.map((elem) => {
        return elem.id;
      });

    const projects =
      this.props.user &&
      this.state.projects.map((elem, id) => {
        return (
          <ProjectList
            key={id}
            projectid={elem.id}
            title={elem.title}
            department={elem.department}
            desc={elem.desc}
            categ={elem.category.join(" | ")}
            click={this.props.click}
            applied={applied.includes(elem.id)}
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
