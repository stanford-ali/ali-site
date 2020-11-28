import React, { Component } from "react";
import { Accordion, Tooltip, OverlayTrigger } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import "./ApproveProject.scss";
import Button from "../../../../GlobalUI/Button/Button";

class ApproveProject extends Component<any, any> {
  render() {
    // Render tooltip function
    const renderTooltip = (props) => {
      return (
        <Tooltip id="button-tooltip" {...props}>
          View Project
        </Tooltip>
      );
    };

    // Handler for approving a project - move this to Following.tsx so a state update can be made
    const onApprove = (event) => {
      this.props.approve(event, this.props._id, this.props.index);
    };

    // Date conversion
    const d = new Date(this.props.createdAt);

    const departments = this.props.departments.map((elem, id) => {
      return <p key={id}>{elem}</p>;
    });

    const courses = this.props.courses.map((elem, id) => {
      return <p key={id}>{elem}</p>;
    });

    const categories = this.props.categories.map((elem, id) => {
      return <p key={id}>{elem}</p>;
    });

    const questions = this.props.questions.map((elem, id) => {
      return <p key={id}>{elem}</p>;
    });

    const skills = this.props.skills.map((elem, id) => {
      return <p key={id}>{elem}</p>;
    });

    const tags = this.props.tags.map((elem, id) => {
      return <p key={id}>{elem}</p>;
    });

    return (
      <Accordion>
        <div className="ApproveProjects">
          <p className="ApproveTitle">{this.props.title}</p>
          <p>{d.toDateString()}</p>
          <div>
            {" "}
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <Accordion.Toggle className="ExpandApplication" eventKey="0">
                <AiOutlinePlus
                  color="#3246bb"
                  size={25}
                  style={{ pointerEvents: "none" }}
                />
              </Accordion.Toggle>
            </OverlayTrigger>
          </div>
        </div>
        <Accordion.Collapse eventKey="0">
          <div className="ExpandedAnswers">
            <p style={{ fontSize: "18px" }}>Owner:</p> <hr />
            <p>{this.props.owner}</p>
            <p style={{ fontSize: "18px" }}>University:</p> <hr />
            <p>{this.props.university}</p>
            <p style={{ fontSize: "18px" }}>Timeframe:</p> <hr />
            <p>{this.props.timeframe}</p>
            <p style={{ fontSize: "18px" }}>Project Details:</p> <hr />
            <p>{this.props.description}</p>
            <p style={{ fontSize: "18px" }}>Departments:</p> <hr />
            {departments}
            <p style={{ fontSize: "18px" }}>Courses:</p> <hr />
            {courses}
            <p style={{ fontSize: "18px" }}>Categories:</p> <hr />
            {categories}
            <p style={{ fontSize: "18px" }}>Questions:</p> <hr />
            {questions}
            <p style={{ fontSize: "18px" }}>Skills:</p> <hr />
            {skills}
            <p style={{ fontSize: "18px" }}>Tags:</p> <hr />
            {tags}
            <Button click={onApprove}>Approve</Button>
          </div>
        </Accordion.Collapse>
      </Accordion>
    );
  }
}

export default ApproveProject;
