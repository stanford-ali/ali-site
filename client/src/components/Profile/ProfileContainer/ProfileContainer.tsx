import React from "react";
import QandA from "./QandA/QandA";
import Following from "./Following/Following";
import "./ProfileContainer.scss";
import SelfProjects from "./SelfProjects/SelfProjects";
import Approve from "./Approve/Approve";

export default function ProfileContainer() {
  return (
    <div className="ProfileContainer">
      <div className="ProfileContainerTop">
        <QandA />
        <Following />
      </div>
      <SelfProjects />
      <Approve/>
    </div>
  );
}
