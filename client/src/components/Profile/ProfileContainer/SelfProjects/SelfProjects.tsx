import React, { Component } from "react";
import "./SelfProjects.scss";

export default class SelfProjects extends Component {
  render() {
    return (
      <div className="SelfProjects">
        <div className="SelfProjectsHead">
          <h3 style={{ color: "white" }}>My Projects</h3>
        </div>
        <div className="SelfProjectsContent">Content</div>
      </div>
    );
  }
}
