import React from "react";
import FollowProject from "./FollowProject/FollowProject";
import "./Following.scss";

export default function Following() {
  return (
    <div className="Following">
      <div className="FollowingHead">
        <h1>Following</h1>
      </div>
      <FollowProject />
    </div>
  );
}
