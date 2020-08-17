import React from "react";
import { FaDna } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import "./FollowProject.scss";

export default function FollowProject(props) {
  return (
    <div className="FollowProjects">
      <li className="Title">
        <div>
          <FaDna style={{ marginRight: "5px" }} />
          {props.title}
        </div>

        <AiOutlineClose color="#ff7070" size={30} />
      </li>
      <ul className="ProjectCaption">
        <li className="Department">
          <p>{props.department}</p>
        </li>
      </ul>
    </div>
  );
}
