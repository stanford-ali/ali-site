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
      <h3 style={{ fontSize: "20px", color: "#5F574F" }}>Experience:</h3>
      <EditableText value="" />
    </div>
  );
}
