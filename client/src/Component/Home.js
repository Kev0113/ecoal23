//making the home page for the app that shows the header which has the name of the app and the logo 
//and below it it has the navlinks home, news, search, register, login,
// and the body of the page and the footer of the page all using bootstrap
import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../logo.png";
import Articles from "./Articles";


function Home() {
    return (
        <>
        <div className="container">
            <div className="row">
            <div className="col-12">
                <h3 className="fst-italic fw-bold">Welcome to The Daily Towner</h3>
                <hr className = "border border-dark border-2 opacity-100"></hr>
                    <h3 className="mb-4 text-center fw-bold">Our latest Story:</h3>
                    {/* <Articles></Articles> */}
            </div>
            </div>
        </div>
        </>
    );
    }

export default Home;
