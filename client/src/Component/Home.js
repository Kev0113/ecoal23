//making the home page for the app that shows the header which has the name of the app and the logo 
//and below it it has the navlinks home, news, search, register, login,
// and the body of the page and the footer of the page all using bootstrap
import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "./logo.png";

function Home() {
    return (
        <>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">
            <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
            />{" "}
            News App
            </Navbar.Brand>
            <Nav className="mr-auto">
            <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/news">
                <Nav.Link>News</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/search">
                <Nav.Link>Search</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
                <Nav.Link>Register</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            </Nav>
            <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
            </Form>
        </Navbar>
        <div className="container">
            <div className="row">
            <div className="col-12">
                <h1>Home</h1>
            </div>
            </div>
        </div>
        <footer className="footer">
            <div className="container">
            <span className="text-muted">Place sticky footer content here.</span>
            </div>
        </footer>
        </>
    );
    }

export default Home;
