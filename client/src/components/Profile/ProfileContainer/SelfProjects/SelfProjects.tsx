import React, { Component } from "react";
import { connect } from "react-redux";
import SelfProject from "./SelfProject/SelfProject";
import SelfProjectFocus from "./SelfProjectFocus/SelfProjectFocus";
import "./SelfProjects.scss";
import { GrProjects } from "react-icons/gr";
import {
  loadProjects,
  clickProject,
} from "../../../../store/profile/profile.actions";
import SelfProjectApplications from "./SelfProjectApplications/SelfProjectApplications";

class SelfProjects extends Component<any, any> {
  componentDidMount() {
    // Get Applications By Owner
    const uid = this.props.user.uid;
    this.props.onLoadProjects(uid);
  }

  render() {
    const focusFiller = (
      <div className="FocusFillerSelfProject">
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

    const selfProjects = this.props.ownedProjects
      .slice(0)
      .reverse()
      .map((elem, id) => {
        return (
          <SelfProject
            key={id}
            click={() => this.props.onClickProject(elem)}
            {...elem}
          />
        );
      });

    return (
      <div className="SelfProjects">
        <div className="SelfProjectsHead">
          <h3 style={{ color: "white" }}>My Projects</h3>
        </div>
        <div className="SelfProjectsContent">
          <div className="SelfProjectsCards">{selfProjects}</div>
          <div className="SelfProjectsFocus">
            {!this.props.selfProjectSelected ? (
              this.props.selfProjectApplicationsSelected ? (
                this.props.selfProjectApplications.map((elem, id) => {
                  return <SelfProjectApplications key={id} {...elem} />;
                })
              ) : (
                focusFiller
              )
            ) : (
              <SelfProjectFocus />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    ownedProjects: state.profile.ownedProjects,
    selfProjectSelected: state.profile.selfProjectSelected,
    selectedProject: state.profile.selectedProject,
    selfProjectApplications: state.profile.selfProjectApplications,
    selfProjectApplicationsSelected:
      state.profile.selfProjectApplicationsSelected,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadProjects: (user_id) => dispatch(loadProjects(user_id)),
    onClickProject: (project) => dispatch(clickProject(project)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelfProjects);
