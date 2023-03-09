import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";

function EditArticle({ match }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [mediaURL, setMediaURL] = useState("");
  const [leadStory, setLeadStory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/articles/${match.params.id}`,
        {
          title,
          content,
          thumbnailURL,
          mediaType,
          mediaURL,
          leadStory,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/articles/${match.params.id}`
        );
        setTitle(response.data.title);
        setContent(response.data.content);
        setThumbnailURL(response.data.thumbnailURL);
        setMediaType(response.data.mediaType);
        setMediaURL(response.data.mediaURL);
        setLeadStory(response.data.leadStory);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [match.params.id]);

  return (
    <Container className="my-5">
      <h1 className="text-center mb-5">Edit Article</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="thumbnailURL">
          <Form.Label>Thumbnail URL</Form.Label>
          <Form.Control
            type="text"
            value={thumbnailURL}
            onChange={(e) => setThumbnailURL(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="mediaType">
          <Form.Label>Media Type</Form.Label>
          <Form.Control
            type="text"
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value)}
            />
        </Form.Group>
        <Form.Group controlId="mediaURL">
            <Form.Label>Media URL</Form.Label>
            <Form.Control
                type="text"
                value={mediaURL}
                onChange={(e) => setMediaURL(e.target.value)}
            />
        </Form.Group>
        <Form.Group controlId="leadStory">
            <Form.Label>Lead Story</Form.Label>
            <Form.Control
                type="text"
                value={leadStory}
                onChange={(e) => setLeadStory(e.target.value)}
            />
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
    </Container>
    );
}

export default EditArticle;