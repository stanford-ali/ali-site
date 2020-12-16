import React from "react";
import { Link, NavLink } from "react-router-dom";
import NavbarLoginButton from "./NavbarLoginButton/NavbarLoginButton";
import { connect } from "react-redux";
import BarLoader from "react-spinners/BarLoader";

// import ModalLoader from "../GlobalUI/ModalLoader/ModalLoader";

const Navbar = (props) => (
  <section id="navbar">
    <div>
      <nav id="navbar">
        <div className="navbar">
          <Link to="/" className="navbar-item">
            <img id="logo" src={require("../../assets/logo.svg")} alt="" />
          </Link>
          <Link to="/" className="navbar-item navbar-title">
            <span>Applied Learning Initiative</span>
          </Link>
          <NavLink
            to="/"
            exact
            className="navbar-item page first-page"
            activeClassName="active"
          >
            Home
          </NavLink>
          <NavLink
            to="/projects"
            exact
            className="navbar-item page"
            activeClassName="active"
          >
            Projects
          </NavLink>
          <NavLink
            to="/submit"
            exact
            className="navbar-item page"
            activeClassName="active"
          >
            Submit Project
          </NavLink>
          {props.loading ? (
            <BarLoader color="white" />
          ) : props.user ? (
            <NavbarLoginButton />
          ) : (
            <NavLink
              to="/login"
              exact
              className="navbar-item page"
              activeClassName="active"
            >
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  </section>
);

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    loading: state.base.loading,
  };
};

export default connect(mapStateToProps)(Navbar);
