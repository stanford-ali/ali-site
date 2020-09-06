import React from "react";
import Navbar from "../Navbar/Navbar";
import { auth, uiConfig } from "../../config/fbConfig";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Login = (props) => {
  return props.user ? (
    <Redirect to={props.redirect} />
  ) : (
    <>
      <Navbar />
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    redirect: state.base.redirect,
  };
};

export default connect(mapStateToProps)(Login);
