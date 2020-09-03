import React from "react";
import Navbar from "../Navbar/Navbar";
import { auth, uiConfig } from "../../config/fbConfig";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const Login = () => {
  return (
    <>
      <Navbar />
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </>
  );
};

export default Login;
