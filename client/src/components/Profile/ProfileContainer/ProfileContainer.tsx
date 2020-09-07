import React from "react";
import QandA from "./QandA/QandA";
import Following from "./Following/Following";
import "./ProfileContainer.scss";
import SelfProjects from "./SelfProjects/SelfProjects";

export default function ProfileContainer() {
  return (
    <div className="ProfileContainer">
      <div className="ProfileContainerTop">
        <QandA />
        <Following />
      </div>
      <SelfProjects />
    </div>
  );
}
