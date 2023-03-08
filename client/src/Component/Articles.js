//cookies is a prop that is passed down from App.js to Header.js to Articles.js
//when the user clickes in the articles page the user is directed here
//the articles page is a protected route, so the user must be logged in to access it
//and the articles database has the articles id, type integer, and the articles title, type varchar
//articles content type text, articles thumbbail Url type varchar, media type varchar,media url type varchar, leadstory tinyint, createdDate DATETIME, updatedDate DATETIME

import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";

function Articles({ cookies }) {
    const [articles, setArticles] = useState([]);
    
    useEffect(() => {
        axios
        .get("http://127.0.0.1:8000/api/articles")
        .then((res) => {
            setArticles(res.data);
        }
        )
        .catch((err) => console.log(err));
    }, []);

    return (
        <Container className="my-5">
            <h1 className="text-center mb-5">The Daily Towner</h1>
            <Row className="justify-content-center">
                <Col md={6}>
                    <h3 className="mb-4 text-center">Articles</h3>
                    {articles.map((article) => (
                        <Card className="mb-3" key={article.id}>
                            <Card.Body>
                                <Card.Title>{article.title}</Card.Title>
                                <Card.Text>{article.content}</Card.Text>
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
        