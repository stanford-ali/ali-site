import React from "react";
import { BiBookAlt } from "react-icons/bi";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

import "./SelfProject.scss";

export default function SelfProject(props) {
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
    console.log("viewing applications");
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
