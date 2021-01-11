import React from "react";
import { Accordion, Card } from "react-bootstrap";
import "./SelfProjectApplications.scss";

export default function SelfProjectApplications(props) {
  // Applicant's answers to the project's questions
  const qna = props.answers.map((elem, id) => {
    return (
      <div key={id} className="SelfProjectAppQna">
        <h4>{props.project_id.questions[id]}</h4> <p>{elem}</p>
      </div>
    );
  });

  return (
    <Accordion>
      <Card
        style={{
          backgroundColor: "#FFF",
          borderRadius: "15px",
          marginBottom: "15px",
        }}
      >
        <Accordion.Toggle
          as={Card.Header}
          eventKey="0"
          style={{ backgroundColor: "#FFF" }}
        >
          <div className="SelfProjectApplicationsFocus">
            <h3>
              {props.user_id.firstname} {props.user_id.lastname}
            </h3>
            <p style={{ marginBottom: "0" }}>
              {props.user_id.university} {props.user_id.year} <br />
              {props.user_id.email} <br />
              Insert Resume
            </p>
          </div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <div className="SelfProjectApplicationsFocus">
            {qna}
            <hr />
            <h4>Skills</h4>
            <p>{props.owner_id.skills} </p>
            <h4>Programming</h4>
            <p>{props.owner_id.programming}</p>
          </div>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
