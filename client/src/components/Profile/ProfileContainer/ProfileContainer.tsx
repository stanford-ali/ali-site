import React from "react";
import QandA from "./QandA/QandA";
import Following from "./Following/Following";
import "./ProfileContainer.scss";

export default function ProfileContainer() {
  return (
    <div className="ProfileContainer">
      <QandA />
      <Following />
    </div>
  );
}
