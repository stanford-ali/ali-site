import React from "react";
import RingLoader from "react-spinners/RingLoader";
import "./ModalLoader.scss";
export default function ModalLoader() {
  return (
    <div className="Loader">
      <RingLoader color="#3246bb" />
    </div>
  );
}
