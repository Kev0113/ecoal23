import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";

function AddArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [mediaURL, setMediaURL] = useState("");
  const [leadStory, setLeadStory] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/articles", {
        title,
        content,
        thumbnailURL,
        mediaType,
        mediaURL,
        leadStory,
      });
      navigate.push("/");
      alert("Article added successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-5">Add Article</h1>
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
                type="checkbox"
                label="Lead Story"
                checked={leadStory}
                onChange={(event) => setLeadStory(event.target.checked)}
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