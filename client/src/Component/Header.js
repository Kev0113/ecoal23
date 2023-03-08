import React, { useState } from "react";
import { Route, Link, Routes } from "react-router-dom";
import logo from '../logo.png';
import '../css/header.css';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useCookies } from 'react-cookie';

import Register from "./Register";
import Login from "./Login";
import Home from "./Home";

function Header({ cookies, removeCookie }) {
    const [isLoggedIn, setIsLoggedIn] = useState(cookies.mycookie !== undefined);
    console.log(cookies.mycookie)
    // to get the name of the user from the cookie
    const name = cookies.mycookie ? cookies.mycookie.name : null;

    const handleLogout = () => {
        setIsLoggedIn(false);
        removeCookie('mycookie');
    };

    return (
        <>
            <Navbar className="brand" variant="dark">
                <Container className="justify-content-center">
                    <Navbar.Brand className="brand-logo" href="/">
                        <img
                            alt="logo"
                            src={logo}
                            className="d-inline-block align-top"
                        />{' '}
                        The Daily Towner
                    </Navbar.Brand>
                </Container>
            </Navbar>

            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        <Link to="/" className="nav-link">Home</Link>
                        <span className="divide">|</span>
                        <Link to="/news" className="nav-link">News</Link>
                        <span className="divide">|</span>
                        <Link to="/search" className="nav-link">Search</Link>
                        <span className="divide">|</span>
                        {isLoggedIn ? (
                            <>
                                {cookies.mycookie && (
                                    <>
                                        <span className="nav-link">Welcome, {name}</span>
                                        <span className="divide">|</span>
                                        <Link to="/" className="nav-link" onClick={handleLogout}>Logout</Link>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <Link to="/register" className="nav-link">Register</Link>
                                <span className="divide">|</span>
                                <Link to="/login" className="nav-link">Login</Link>
                            </>
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;
