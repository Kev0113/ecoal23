import React, { useState } from "react";
import { Route, Link, Routes } from "react-router-dom";
import logo from '../logo.png';
import '../css/header.css';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import Articles from "./Articles";

import Register from "./Register";
import Login from "./Login";
import Home from "./Home";

function Header({ cookies, removeCookie, handleSearchChange , searchTerm}) {
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
                        <Link to="/articles" className="nav-link">Articles</Link>
                        <span className="divide">|</span>
                        {/* a button to search */}
                        <button style={{ background: "none", border: "none" }} className="nav-link" onClick={handleSearchClick}>Search</button>
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
        </>
    );
}

export default Header;
