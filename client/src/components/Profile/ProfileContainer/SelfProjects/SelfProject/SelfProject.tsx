import React from "react";
import { BiBookAlt } from "react-icons/bi";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { connect } from "react-redux";
import "./SelfProject.scss";
import { getApplications } from "../../../../../store/profile/profile.actions";

function SelfProject(props) {
  const renderTooltip = (props) => {
    const { pid, ...rest } = props;
    return (
      <Tooltip id="button-tooltip" {...rest}>
        View Applications
      </Tooltip>
    );
  };

  const handleViewApplications = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const user_id = props.user.uid;
    props.onGetSelfProjectApplications(props._id, user_id);
  };

  const date = new Date(props.createdAt);
  return (
    <div className="SelfProject" onClick={props.click}>
      <div className="SelfProjectTitle">
        <h3>{props.title}</h3>
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <BiBookAlt
            onClick={handleViewApplications}
            className="SelfProjectApplications"
            style={{ cursor: "pointer", marginLeft: "5px", width: "5%" }}
            size={20}
          />
        </OverlayTrigger>
      </div>
      <p>Created: {date.toDateString()}</p>
      <p>Applications: </p>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    selfProjectApplications: state.profile.selfProjectApplications,
    selfProjectApplicationsSelected:
      state.profile.selfProjectApplicationsSelected,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetSelfProjectApplications: (project_id, user_id) =>
      dispatch(getApplications(project_id, user_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelfProject);
