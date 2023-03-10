//making the home page for the app that shows the header which has the name of the app and the logo 
//and below it it has the navlinks home, news, search, register, login,
// and the body of the page and the footer of the page all using bootstrap
import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container, Row, Col, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../logo.png";
import Article from "./Article";


function Home() {
    return (
        <>
        <div className="container">
            <div className="row">
            <div className="col-12">
                    <h3 className="mb-4 text-center fw-bold">Home</h3>
                    {/* <Article></Article>         */}
            </div>
            </div>
        </div>
        </>
    );
    }

export default Home;
