import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import ProjectsContainer from "./ProjectsContainer/ProjectsContainer";
export default class Projects extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <ProjectsContainer />
      </React.Fragment>
    );
  }
}
