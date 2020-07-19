import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Dropdown, DropdownButton, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../store/actions/auth.actions";
import "./navbar.scss";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const { firstname, lastname } = useSelector((state) => ({
    firstname: state.auth.user ? state.auth.user.firstname : null,
    lastname: state.auth.user ? state.auth.user.lastname : null,
  }));

  useEffect(() => {
    if (window.gapi && !loggedIn) {
      window.gapi.load("signin2", () => {
        window.gapi.signin2.render("login-button", {});
      });
    }
  }, [loggedIn]);

  let login = loggedIn ? (
    <DropdownButton
      id="dropdown-basic-button"
      className="navbar-item"
      title={`${firstname} ${lastname} `}
    >
      <Dropdown.Item href="/profile">My Profile</Dropdown.Item>
      <Dropdown.Item
        as="button"
        id="signout"
        onClick={() => dispatch(logout())}
      >
        Logout
      </Dropdown.Item>
    </DropdownButton>
  ) : (
    <div id="login-button" className="navbar-item last-page" />
  );

  // If loading for authorization, render spinner
  if (props.loading) {
    login = (
      <Spinner animation="border" role="status" variant="light">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  return (
    <section id="navbar">
      <nav id="navbar">
        <div className="navbar">
          <Link to="/" className="navbar-item">
            <img id="logo" src={require("../../../assets/logo.svg")} alt="" />
          </Link>
          <Link to="/" className="navbar-item navbar-title">
            <span>Applied Learning Initiative</span>
          </Link>
          <NavLink
            to="/"
            exact
            activeClassName="active"
            className="navbar-item page first-page"
          >
            Home
          </NavLink>
          <NavLink
            to="/projects"
            exact
            activeClassName="active"
            className="navbar-item page"
          >
            Projects
          </NavLink>
          {login}
        </div>
      </nav>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps)(Navbar);
