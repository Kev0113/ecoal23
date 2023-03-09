import React, { useState } from "react";
import { Route, Link, Routes } from "react-router-dom";
import logo from '../logo.png';
import '../css/header.css';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { BiChevronDown } from 'react-icons/bi';
import { useCookies } from 'react-cookie';
import Articles from "./Articles";

import Register from "./Register";
import Login from "./Login";
import Home from "./Home";

function Header({ cookies, removeCookie, handleSearchChange, searchTerm }) {
    const [isLoggedIn, setIsLoggedIn] = useState(cookies.mycookie !== undefined);
    const [showSearch, setShowSearch] = useState(false);



    const name = cookies.mycookie ? cookies.mycookie.name : null;

    // const handleSearchChange = (event) => {
    //     setSearchTerm(event.target.value);
    // };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // Do something with the search term, e.g. redirect to a search results page
    };



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
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <span className="menu-item">Welcome, {name}&nbsp;</span>
                                        <NavDropdown id="nav-dropdown">
                                            <NavDropdown.Item>
                                                <Link to="/profile" className="menu-item bg-dark">Profile</Link>
                                            </NavDropdown.Item>
                                            <NavDropdown.Item>
                                                <Link to="/manage-article" className="menu-item bg-dark">Manage Article</Link>
                                            </NavDropdown.Item>
                                            <NavDropdown.Item>
                                                <Link to="/add-article" className="menu-item bg-dark">Add New Article</Link>
                                            </NavDropdown.Item>
                                            <NavDropdown.Item>
                                                <Link to="/contact-us" className="menu-item bg-dark">Contact us</Link>
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                        <span className="divide">|</span>
                                        <Link to="/" className="menu-item" onClick={handleLogout}>Logout</Link>
                                    </div>
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
                            <form onSubmit={handleSearchSubmit}>
                                <input type="text" placeholder="Search Articles Here......" value={searchTerm} onChange={handleSearchChange} />

                                <button type="submit">Search</button>
                            </form>
                        </div>
                    )}

                </Container>
            </Navbar>
            <br/><br/>
                <center><h3 className="fst-italic fw-bold">Welcome to The Daily Towner</h3></center>
                <hr className = "border border-dark border-2 opacity-100"></hr>
        </>
    );
}

export default Header;
