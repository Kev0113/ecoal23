import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

function Profile() {
    const [cookies, setCookie] = useCookies(["mycookie"]);
    const [username, setUsername] = useState(cookies.mycookie.name);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [updatePassword, setUpdatePassword] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [error, setError] = useState(null);
    const history = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEditClick = () => {
        setIsEditable(true);
    };

    const handleSaveClick = () => {
        // TODO: handle save logic
        setIsEditable(false);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleUpdatePasswordChange = (event) => {
        setUpdatePassword(event.target.checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        // Check if the new password matches the confirmed password
        if (password !== confirmPassword) {
            setError("Password does not match the confirmation.");
            return;
        }

        // Submit the form to the server to update the user information
        const data = {
            name: username,
            password: password,
        };
        const userId = cookies.mycookie.userId;
        axios
            .post(`http://127.0.0.1:8000/api/settings/${userId}`, data, {
                headers: {
                    Authorization: `Bearer ${cookies.mycookie.token}`,
                },
            })
            .then((res) => {
                console.log(res);
                setCookie("mycookie", { name: username, token: cookies.mycookie.token , email: cookies.mycookie.email, userId: cookies.mycookie.userId  }, { path: "/" });
                history.push("/");
            })
            .catch((err) => console.log(err));
    };

    return (
        <Container className="my-5">
            <h3 className="mb-4 text-center fw-bold">Profile</h3>
            <Row className="justify-content-center">
                <Col md={6}>
                    <Form onSubmit={handleSubmit} className="p-4">
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={cookies.mycookie.email}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <div className="input-group">
                                {isEditable ? (
                                    <Form.Control
                                        type="text"
                                        value={username}
                                        onChange={handleUsernameChange}
                                        autoComplete="off"
                                        className="rounded-pill border-dark border-2 my-2"
                                    />
                                ) : (
                                    <Form.Control
                                        type="text"
                                        value={username}
                                        readOnly
                                        plaintext
                                        className="rounded-pill border-dark border-2 my-2"
                                    />
                                )}
                                <div className="input-group-append">
                                    {isEditable ? (
                                        <Button
                                            type="button"
                                            variant="outline-secondary"
                                            onClick={handleSaveClick}
                                        >
                                            <i className="bi bi-check"></i>
                                        </Button>
                                    ) : (
                                        <Button
                                            type="button"
                                            variant="outline-secondary"
                                            onClick={handleEditClick}
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group controlId="updatePassword">
                            <Form.Check
                                type="checkbox"
                                label="Do you want to update password?"
                                onChange={handleUpdatePasswordChange}
                            />
                        </Form.Group>
                        {updatePassword && (
                            <>
                                <Form.Group controlId="password">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        autoComplete="off"
                                        className="rounded-pill border-dark border-2 my-2"
                                    />
                                </Form.Group>
                                <Form.Group controlId="confirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        autoComplete="off"
                                        className="rounded-pill border-dark border-2 my-2"
                                    />
                                </Form.Group>
                            </>
                        )}
                        <Button type="submit" variant="primary" className="rounded-pill">
                            Update
                        </Button>
                    </Form>
                    {error && <p className="text-danger mt-3">{error}</p>}
                </Col>
            </Row>

            {/* add a delete account message that takes you to the component */}
            <Link to="/delete-account">Delete Account</Link>
        </Container>
    );
}

export default Profile;