import React from "react";
import { connect } from "react-redux";
import { logout } from "../../../store/actions/auth.actions";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarLoginButton = (props) => {
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
          onClick={() => props.onLogout()} // update
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
