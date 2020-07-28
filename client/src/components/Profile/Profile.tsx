import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "../Navbar/Navbar";
import ProfileContainer from "./ProfileContainer/ProfileContainer";
import { IUser } from "../../store/types/auth.types";
import "./Profile.scss";

class Profile extends Component<{ auth: IUser }, { auth: IUser }> {
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

const mapStateToProps = (state) => {
  return {
    auth: state.auth.user,
  };
};

export default connect(mapStateToProps)(Profile);
