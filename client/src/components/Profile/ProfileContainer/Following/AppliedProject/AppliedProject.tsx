import React from "react";
import { useHistory } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { RiUserStarLine } from "react-icons/ri";
import { Accordion, Tooltip, OverlayTrigger } from "react-bootstrap";
import "./AppliedProject.scss";
import Answer from "./Answer/Answer";

function AppliedProject(props) {
  const history = useHistory();
  const renderTooltip = (props) => {
    return (
      <Tooltip id="button-tooltip" {...props}>
        View Application
      </Tooltip>
    );
  };

  const qna = props.questions.map((elem, id) => {
    return <Answer key={id} question={elem} answer={props.answers[id]} />;
  });

  const departments = props.departments.join(" | ");

  const selectProject = (event) => {
    history.push(`/projects/?search=${props.projectid}`);
  };

  return (
    <Accordion>
      <div className="AppliedProjects">
        <div>
          <li className="Title">
            <div onClick={selectProject}>
              {props.faculty ? <RiUserStarLine /> : null} {props.title}
            </div>
          </li>
          <ul className="ProjectCaption">
            <li className="Department">
              <p>{departments}</p>
              {/* <p>{this.props.owner}</p> */}
            </li>
          </ul>
        </div>
        <div>
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
          <p style={{ fontSize: "18px" }}>Answers:</p> <hr />
          {qna}
        </div>
      </Accordion.Collapse>
    </Accordion>
  );
}

export default AppliedProject;
