import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import SignUp from "./SignUp/SignUp";
import { connect } from "react-redux";
import { login } from "../../store/actions/auth.actions";
import { auth } from "../../config/fbConfig";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => props.onLogin({ email: email, password: password }))
      .catch((error) => console.log(error));
  };
  return (
    <>
      <Navbar />
      <SignUp />
      <div>
        <form>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignIn}>Sign In</button>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (user) => dispatch(login(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
