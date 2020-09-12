import React from "react";
import "./Button.scss";
export default function Button(props) {
  return (
    <button className="Apply" onClick={props.click} disabled={props.disabled}>
      {props.children}
    </button>
  );
}
