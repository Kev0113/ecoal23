import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function Login({ cookies, setCookie }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    const handleChange = (e) => {
        if (e.target.name === "email") {
            setEmail(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(`http://127.0.0.1:8000/api/login`, { email, password })
            .then((res) => {
                console.log(res);
                setCookie("mycookie", { name: res.data.name, token: res.data.access_token, email: res.data.email , userId: res.data.userId}, { path: "/" });
              window.location.replace("/");
            })
            .catch((err) => console.log(err));
    };

        if(redirect) {
        //make the page relaod then redirect to home page
        return <Navigate to="/" />;
    }

    return (
        <Container className="my-5">
            <h1 className="text-center mb-5">The Daily Towner</h1>
            <Row className="justify-content-center">
                <Col md={6}>
                    <h3 className="mb-4 text-center">Login</h3>
                    <Form onSubmit={handleSubmit} className="p-4">
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleChange}
                                autoComplete="off"
                                className="rounded-pill border-dark border-2 my-2"
                            />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={handleChange}
                                autoComplete="off"
                                className="rounded-pill border-dark border-2 my-2"
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-around">
                            <Link
                                to="/"
                                className="px-5 py-2 rounded"
                                style={{
                                    backgroundColor: "#212529",
                                    color: "#FAF2E6",
                                    border: "2px solid black",
                                    textDecoration: "none",
                                    marginTop: "1rem",
                                }}
                            >
                                Back
                            </Link>
                            <Button
                                type="submit"
                                className="px-5 py-2"
                                variant="dark"
                                style={{ color: "#FAF2E6", marginTop: "1rem" }}
                            >
                                Login
                            </Button>
                        </div>
                    </Form>
                    <p className="mt-4 text-center">
                        Don't have an account?{" "}
                        <Link to="/register" className="link-in-class">
                            Register
                        </Link>
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
