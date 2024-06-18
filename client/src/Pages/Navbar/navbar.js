import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";

function NavBar() {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      style={{
        background: "linear-gradient(to right,rgb(0 0 0 / 60%),#fff)",
        marginTop: "-11px",
        height: "79px",
        padding: "0px 53px",
      }}
    >
      <Container fluid>
        <Navbar.Brand
          className="Name"
          style={{ paddingLeft: "157px", paddingRight: "25px" }}
          as={Link}
          to="/"
        >
          NameOfApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{
              maxHeight: "100px",
              paddingLeft: "14px",
            }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link href="#how-it-works">How It Works</Nav.Link>
            <Nav.Link href="#browse-jobs">Browse Jobs</Nav.Link>
          </Nav>
          <Nav className="d-flex align-items-center">
            <Nav.Link as={Link} to="/login">
              Log In
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              Sign Up
            </Nav.Link>
          </Nav>
          <Button
            as={Link}
            to="/job-post"
            style={{ padding: "5px 25px", margin: "52px" }}
            variant="dark"
          >
            Post Project
          </Button>{" "}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
