import React from "react";
import { FaDna, FaRegWindowClose } from "react-icons/fa";
import "./FollowProject.scss";

export default function FollowProject() {
  return (
    <div className="FollowProjects">
      <li className="Title">
        <div>
          <FaDna style={{ marginRight: "5px" }} />
          YESSIR
        </div>

        <FaRegWindowClose />
      </li>
      <ul className="ProjectCaption">
        <li className="Department">
          <p>YESSIR</p>
        </li>
        <li>
          <button type="submit" className="Apply">
            Apply
          </button>
        </li>
      </ul>
    </div>
  );
}
