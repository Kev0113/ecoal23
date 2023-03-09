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
    const [showSearch, setShowSearch] = useState(false);
    const name = cookies.mycookie ? cookies.mycookie.name : null;

    const handleSearchClick = () => {
        setShowSearch(!showSearch);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        removeCookie('mycookie');
    };

    return (
        <>
            <Navbar className="brand" variant="dark">
                <Container className="justify-content-center">
                    <Navbar.Brand className="brand-logo fw-bold" href="/">
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
                    <Nav className="me-auto fw-bold">
                        <Link to="/" className="menu-item">Home</Link>
                        <span className="divide">|</span>
                        <Link to="/articles" className="menu-item">Articles</Link>
                        <span className="divide">|</span>
                        {/* a button to search */}
                        <button style={{background:"none", border: "none"}} className="menu-item fw-bold" onClick={handleSearchClick}>Search</button>
                        <span className="divide">|</span>
                        {isLoggedIn ? (
                            <>
                                {cookies.mycookie && (
                                    <>
                                        <span className="menu-item">Welcome, {name}</span>
                                        <span className="divide">|</span>
                                        <Link to="/" className="menu-item" onClick={handleLogout}>Logout</Link>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <Link to="/register" className="menu-item">Register</Link>
                                <span className="divide">|</span>
                                <Link to="/login" className="menu-item">Login</Link>
                            </>
                        )}
                    </Nav>
                    {showSearch && (
                        <div className="search-bar">
                            <input type="text" placeholder="Search..." />
                        </div>
                    )}
                </Container>
            </Navbar>
            <br/><br/>
                <h3 className="fst-italic fw-bold">Welcome to The Daily Towner</h3>
                <hr className = "border border-dark border-2 opacity-100"></hr>
        </>
    );
}

export default Header;
