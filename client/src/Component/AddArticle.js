import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useCookies } from "react-cookie";

function AddArticle() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [thumbnailURL, setThumbnailURL] = useState("");
    const [mediaType, setMediaType] = useState("");
    const [mediaURL, setMediaURL] = useState("");
    const [leadStory, setLeadStory] = useState(0);
    const [cookies] = useCookies(['mycookie']);
    const [user_email, setEmail] = useState(cookies.mycookie.email);



    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = cookies.mycookie.token;
            const response = await axios.post(
                "http://127.0.0.1:8000/api/articles/add",
                {
                    title,
                    content,
                    thumbnailURL,
                    mediaType,
                    mediaURL,
                    leadStory,
                    user_email,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            navigate("/");
            alert("Article added successfully!");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container className="my-5">
            <h3 className="mb-4 text-center fw-bold">Add Article</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formContent">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Enter content"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formThumbnailURL">
                    <Form.Label>Thumbnail URL</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter thumbnail URL"
                        value={thumbnailURL}
                        onChange={(event) => setThumbnailURL(event.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formMediaType">
                    <Form.Label>Media Type</Form.Label>
                    <Form.Control
                        as="select"
                        value={mediaType}
                        onChange={(event) => setMediaType(event.target.value)}
                    >
                        <option value="">Select media type</option>
                        <option value="video">Video</option>
                        <option value="image">Image</option>
                        <option value="audio">Audio</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formMediaURL">
                    <Form.Label>Media URL</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter media URL"
                        value={mediaURL}
                        onChange={(event) => setMediaURL(event.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formLeadStory">
                    <Form.Check
                        type="number"
                        label="Lead Story"
                        value={leadStory}
                        onChange={(event) => setLeadStory(event.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default AddArticle;