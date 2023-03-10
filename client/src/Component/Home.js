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

                        <Container className="my-5">
                            <h3 className="mb-4 text-center fw-bold">Our latest Stories:</h3>
                            <Row className="justify-content-center">
                                <Col md={6}>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>Traveling to Remote Destinations Boosts Mental Health</Card.Title>
                                                <Card.Img variant="top" src={"https://media.tenor.com/G7RCgbI7ypMAAAAd/airplane-dancing.gif"} />
                                                <Card.Text>A new study conducted by the International Tourism Board has shown that traveling to remote destinations can have a positive impact on mental health. The study surveyed over 500 travelers who had visited remote destinations, such as the Amazon rainforest, the Arctic Circle, or the Australian Outback, and found that 90% of respondents reported feeling a significant improvement in their mental health.</Card.Text>
                                                <Card.Text>Created on: 10/03/2023</Card.Text>
                                                <Link to={`/articles`}>
                                                    <Button variant="primary">Read More</Button>
                                                </Link>
                                            </Card.Body>
                                        </Card>
                                </Col>
                            </Row>
                        </Container>



                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
