import React from "react";
import "./SelfProjectApplications.scss";

export default function SelfProjectApplications(props) {
  // Applicant's answers to the project's questions
  const qna = props.answers.map((elem, id) => {
    return (
      <div className="SelfProjectAppQna">
        <h4>{props.project_id.questions[id]}</h4> <p>{elem}</p>
      </div>
    );
  });

  return (
    <div className="SelfProjectApplicationsFocus">
      <h3>
        {props.owner_id.firstname} {props.owner_id.lastname}
      </h3>
      <p>
        {props.owner_id.university} {props.owner_id.year} <br />
        {props.owner_id.email} <br />
        Insert Resume
      </p>
      <hr />
      {qna}
      <hr />
      <h4>Skills</h4>
      <p>{props.owner_id.skills} </p>
      <h4>Programming</h4>
      <p>{props.owner_id.programming}</p>
    </div>
  );
}
