import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col,Button } from "react-bootstrap";
import axios from "axios";
import '../css/article.css';

function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/articles/${id}`
        );
        setArticle(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  if (!article) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} id="container">
          <p className="mb-5" id="title">{article.title}</p>
          <img src={article.mediaURL} alt={article.title} className="img-fluid mb-4" id="image" />
          <p className="lead">{article.leadStory}</p>
          <div dangerouslySetInnerHTML={{ __html: article.content }} id="content" className = "fw-bold"></div>
          <Button variant="primary" href="/articles" id="button">Back</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Article;
