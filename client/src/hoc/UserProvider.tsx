import React, { useEffect } from "react";
import { connect } from "react-redux";
import { auth } from "../firebase";
import { fetchUser, logout } from "../store/auth/auth.actions";

const UserProvider = (props) => {
  // Auth observable (get the current user)
  useEffect(() => {
    let unsubscribeFromAuth = null;
    unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        // If user exists, set the current user fetchUser
        props.onFetchUser(user.uid);
      } else {
        // If user doesn't exist, clear user
        props.onLogout();
      }
    });
  }, []);

  return props.children;
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUser: (uid) => dispatch(fetchUser(uid)),
    onLogout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProvider);
