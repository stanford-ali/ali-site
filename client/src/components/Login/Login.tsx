import React from "react";
import Navbar from "../Navbar/Navbar";
import { auth, uiConfig } from "../../firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Login.scss";
import loginimage from "../../assets/login.png";

const Login = (props) => {
  return props.user ? (
    <Redirect to={props.redirect} />
  ) : (
    <div className="whole-container">
      <Navbar />
      <div className="login-container">
        <div className="login-left-container">
          <img src={loginimage} alt="login" className="login-image" />
        </div>
        <div className="login-right-container">
          <div className="login-title">
            <h1>Sign In to Continue</h1>
          </div>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    redirect: state.base.redirect,
  };
};

export default connect(mapStateToProps)(Login);
