import React from "react";
import { BiErrorCircle, BiEnvelope } from "react-icons/bi";
import "./ModalError.scss";
export default function ModalError() {
  return (
    <div className="Backdrop">
      <div className="Error">
        <div className="ErrorTop">
          <BiErrorCircle size={60} color={"white"} />
        </div>
        <div className="ErrorBottom">
          <h3>Error</h3>
          <p>
            Something went wrong... <br />
            Please refresh the page
          </p>
          <a href="mailto:acui@stanford.edu">
            <BiEnvelope size={30} color={"#E85E6C"} />
          </a>
        </div>
      </div>
    </div>
  );
}

// Click backdrop changes base error to false?
