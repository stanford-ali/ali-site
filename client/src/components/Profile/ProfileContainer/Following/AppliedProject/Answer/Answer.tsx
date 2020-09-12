import React from "react";
import "./Answer.scss";

export default function Answer(props) {
  return (
    <div className="Answer">
      <div className="AnswerQuestion">
        <p>{props.question}</p>
      </div>
      <div className="AnswerVertical"></div>
      <div className="AnswerAnswer">
        <p>{props.answer}</p>
      </div>
    </div>
  );
}
