import React from "react";
import ProjectsImage from "../../../assets/projects.png";
import ALIlogo from "./HomeLogo/HomeLogo";
import Typed from "react-typed";
import { Button } from "react-bootstrap";

import "./HomeContainer.scss";
export default function HomeContainer() {
  const viewProjects = () => {
    window.history.pushState({}, "", `/projects`);
  };

  return (
    <div className="HomeContainer">
      <div className="LeftContainer">
        <div>
          <h1 className="HomeMessage1">We connect</h1>
          <h1 className="HomeMessage2">
            <Typed
              strings={["Students", "Undergrads", "Graduates", "You"]}
              typeSpeed={60}
              backSpeed={50}
              loop={true}
            />
          </h1>
          <h1 className="HomeMessage1">to projects</h1>
          <ALIlogo
            className="HomeLogo"
            stroke="#c4c4c466"
            width="400"
            height="400"
          />
        </div>
        <div className="HomeInfo">
          <p>
            We draw students with quantitive backgrounds from computer science,
            mathematics, physics, statistics, and other departments across
            Stanford. Students provide much needed expertise while gaining
            valuable experience working on real‑world projects.
          </p>
          <Button className="HomeButton" onClick={viewProjects}>
            View Projects
          </Button>
        </div>
      </div>
      <img
        className="RightContainer"
        src={ProjectsImage}
        alt="project-building"
      />
    </div>
  );
}
