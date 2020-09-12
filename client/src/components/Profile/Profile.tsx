import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import ProfileContainer from "./ProfileContainer/ProfileContainer";
import "./Profile.scss";

class Profile extends Component<any, any> {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="Profile">
          <ProfileContainer />
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
