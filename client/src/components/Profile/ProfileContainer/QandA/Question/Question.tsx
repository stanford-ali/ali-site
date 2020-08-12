// Component to represent each question on left container of Profile page
import React from "react";
import EditableText from "../EditableText/EditableText";
import "./Question.scss";

export default function Question(props) {
  return (
    <div className="Question">
      <EditableText
        value={props.value}
        textarea={props.textarea}
        questionid={props.questionid}
        question={props.question}
        onEdit={props.onEdit}
      />
      <hr />
    </div>
  );
}
