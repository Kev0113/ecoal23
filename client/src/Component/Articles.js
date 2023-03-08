
//and the articles database has the articles id, type integer, and the articles title, type varchar
//articles content type text, articles thumbbail Url type varchar, media type varchar,media url type varchar, leadstory tinyint, createdDate DATETIME, updatedDate DATETIME

import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";

function Articles({ searchTerm }) {
    const [articles, setArticles] = useState([]);
  const [cookies] = useCookies(['mycookie']);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cookies && cookies.mycookie) {
          const response = await axios.get(
            "http://127.0.0.1:8000/api/articles"
          );
          setArticles(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cookies]);

  const filteredArticles = articles.filter(article => {
    return article.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Container className="my-5">
      <h1 className="text-center mb-5">The Daily Towner</h1>
      <Row className="justify-content-center">
        <Col md={6}>
          <h3 className="mb-4 text-center">Articles</h3>
          {filteredArticles.map((article) => (
            <Card className="mb-3" key={article.id}>
              <Card.Img variant="top" src={article.thumbnailURL} />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.content}</Card.Text>
                <p>Created on: {article.created_at}</p>
                <Link to={`/articles/${article.id}`}>
                  <Button variant="primary">Read More</Button>
                </Link>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default Articles;
