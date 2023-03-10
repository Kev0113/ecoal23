import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

function DeleteAccount() {
    const [password, setPassword] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies(["mycookie"]);
    const [deleted, setDeleted] = useState(false);


    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const userId = cookies.mycookie.userId;

        axios
            .post(`http://127.0.0.1:8000/api/account/delete/${userId}`, {
                email: cookies.mycookie.email,
                password,
            })
            .then((res) => {
                console.log(res);
                removeCookie("mycookie");
                setDeleted(true);
            })
            .catch((err) => console.log(err));
    };

    if (deleted) {
        return <Navigate to="/" />;
    }

    return (
        <Container className="my-5">
            <h3 className="mb-4 text-center fw-bold">Delete Account</h3>
            <Row className="justify-content-center">
                <Col md={6}>
                    <Form onSubmit={handleSubmit} className="p-4">
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                value={cookies.mycookie.email}
                                readOnly
                                plaintext
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
                                onChange={handlePasswordChange}
                                autoComplete="off"
                                className="rounded-pill border-dark border-2 my-2"
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-around">
                            <Button
                                type="submit"
                                className="px-5 py-2"
                                variant="danger"
                                style={{ color: "#FAF2E6", marginTop: "1rem" }}
                            >
                                Delete Account
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default DeleteAccount;
