import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./NavbarBootstrap.scss";
export default function NavbarBootstrap() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">
        <span className="NavbarTitle">ALI</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
