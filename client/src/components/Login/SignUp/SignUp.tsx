import React, { useState } from "react";
import { connect } from "react-redux";
import { signup } from "../../../store/actions/auth.actions";
import { auth } from "../../../config/fbConfig";

function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const handleSignUp = (e) => {
    e.preventDefault();
    if (password === confirmedPassword) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((user) => props.onSignUp(user)) // spread user right here with firstname, etc {...user, firstName }
        .catch((error) => console.log(error));
    } else {
      alert("passwords don't match");
    }
  };

  return (
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
        <input
          type="text"
          placeholder="Confirm Password"
          value={confirmedPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)}
        />
        <button onClick={handleSignUp}>Sign Up</button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: (user) => dispatch(signup(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
