// Component to represent each question on left container of Profile page

import React from "react";
import EditableText from "../EditableText/EditableText";
import "./Question.scss";
/*
props: {
    question:
    answer:
}
*/

export default function Question(props) {
  return (
    <div className="Question">
      <EditableText
        value=""
        textarea={props.textarea}
        question={props.question}
      />
    </div>
  );
}
