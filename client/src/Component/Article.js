import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import '../css/article.css';
import { Link } from "react-router-dom";

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
    <Container fluid className="px-4">
      <Row noGutters className="bg-light">
        <Col className="p-3 d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <div className="h1">The Daily Towner</div>
          </div>
          <Link to={`/articles`}>
            <Button variant="primary">Back</Button>
          </Link>
        </Col>
        <Col xs={12} md={4} className="bg-dark text-light p-3">
          <img src={article.mediaURL} alt={article.title} className="img-fluid mb-4" />
        </Col>
      </Row>
      <Row noGutters className="mb-5">
        <Col xs={12} md={8} className="p-3">
          <h2 className="h1">{article.title}</h2>
          <p className="lead">{article.leadStory}</p>
          <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
          <div className="mt-4">
            <p className="font-italic mb-0">By {article.author} - {article.created_at}</p>
          </div>
        </Col>
       
      </Row>
    </Container>
  );
}

export default Article;
