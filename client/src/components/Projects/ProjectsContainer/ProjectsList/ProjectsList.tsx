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
    return <div>{!this.props.user ? <Loader /> : questions}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(ProjectsList);
