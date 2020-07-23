import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "../Navbar/Navbar";
import ProfileContainer from "./ProfileContainer/ProfileContainer";
import { IUser } from "../../store/types/auth.types";

class Profile extends Component<{ auth: IUser }, { auth: IUser }> {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <ProfileContainer />
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
