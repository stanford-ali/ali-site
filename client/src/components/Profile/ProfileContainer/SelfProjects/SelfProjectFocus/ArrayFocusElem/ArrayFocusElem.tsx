import React from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import "./ArrayFocusElem.scss";
export default function ArrayFocusElem(props) {
  return (
    <div className="ArrayFocusElem">
      <span className="ArrayFocusElemText">
        <AiOutlineMinusCircle
          onClick={props.minus}
          size={20}
          color={"#3246bb"}
          style={{
            marginRight: "5px",
            cursor: "pointer",
          }}
        />
        <p style={{ marginBottom: 0 }}>{props.value}</p>
      </span>
      <div></div>
    </div>
  );
}
