import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function EditArticle({ match }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [mediaURL, setMediaURL] = useState("");
  const [leadStory, setLeadStory] = useState("");
  const [cookies] = useCookies(['mycookie']);
  const { id } = useParams();
  const [user_email, setEmail] = useState(cookies.mycookie.email);
  const navigate = useNavigate();




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = cookies.mycookie.token;
      const response = await axios.post(
        `http://127.0.0.1:8000/api/articles/edit/${id}`
        ,
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
      console.log(response.data);
      navigate("/manage-article");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/articles/${id}`
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
  }, [id]);

  return (
    <Container className="my-5">
      <h1 className="text-center mb-5">Edit Article</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            className="rounded border-dark border-2 my-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            className="rounded border-dark border-2 my-2"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="thumbnailURL">
          <Form.Label>Thumbnail URL</Form.Label>
          <Form.Control
            type="text"
            className="rounded border-dark border-2 my-2"
            value={thumbnailURL}
            onChange={(e) => setThumbnailURL(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="mediaType">
          <Form.Label>Media Type</Form.Label>
          <Form.Control
            type="text"
            className="rounded border-dark border-2 my-2"
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="mediaURL">
          <Form.Label>Media URL</Form.Label>
          <Form.Control
            type="text"
            className="rounded border-dark border-2 my-2"
            value={mediaURL}
            onChange={(e) => setMediaURL(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="leadStory">
          <Form.Label>Lead Story</Form.Label>
          <Form.Control
            type="text"
            className="rounded border-dark border-2 my-2"
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