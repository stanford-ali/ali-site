import React from "react";
import { connect } from "react-redux";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth } from "../../../config/fbConfig";
import { logout } from "../../../store/auth/auth.actions";

const NavbarLoginButton = (props) => {
  const handleLogOut = (e) => {
    e.preventDefault();
    auth
      .signOut()
      .then(() => console.log("Signout Successful"))
      .catch(() => console.log("not successful"));
    props.onLogout();
  };

  return (
    <React.Fragment>
      <DropdownButton
        id="dropdown-basic-button"
        className="navbar-item"
        title={`${props.user.firstname} ${props.user.lastname} `}
      >
        {/* use Link wrapper instead of Dropdown href='/profile' to avoid unnecessary reload/redirect */}
        <Link to="/profile">
          <Dropdown.Item as="button">My Profile</Dropdown.Item>
        </Link>
        <Dropdown.Item
          as="button"
          id="signout"
          onClick={handleLogOut} // update
        >
          Logout
        </Dropdown.Item>
      </DropdownButton>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    loading: state.base.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarLoginButton);
