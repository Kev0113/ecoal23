import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import axios from "axios";

function Articles({ searchTerm }) {
  const [articles, setArticles] = useState([]);
  const [cookies] = useCookies(['mycookie']);
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [newspaperMode, setNewspaperMode] = useState(false);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [tags, setTags] = useState([]);
  const [allTags, setAllTags] = useState([]);


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

  useEffect(() => {
    const tagsList = new Set();
    articles.forEach(article => {
      const tagsArray = Array.isArray(article.tags) ? article.tags : [article.tags];
      tagsArray.forEach(tag => {
        tagsList.add(tag);
      });
    });

    setAllTags(Array.from(tagsList));
}, [articles]);


  const filteredArticles = articles
    .filter(article => {
      return article.title.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .filter(article => {
      return tags.some(tag => article.tags.includes(tag));
    })
    .sort((a, b) => {
      const fieldA = sortBy === 'title' ? a.title.toLowerCase() : a.created_at;
      const fieldB = sortBy === 'title' ? b.title.toLowerCase() : b.created_at;

      let comparison = 0;
      if (fieldA > fieldB) {
        comparison = 1;
      } else if (fieldA < fieldB) {
        comparison = -1;
      }

      if (sortOrder === 'desc') {
        comparison = comparison * -1;
      }

      return comparison;
    });

  const handleSortClick = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleTagChange = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const handleNewspaperModeToggle = () => {
    setNewspaperMode(!newspaperMode);
  };

  const handleNextArticleClick = () => {
    if (currentArticleIndex === filteredArticles.length - 1) {
      setCurrentArticleIndex(0);
    } else {
      setCurrentArticleIndex(currentArticleIndex + 1);
    }
  };

  const handlePreviousArticleClick = () => {
    if (currentArticleIndex === 0) {
      // setCurrentArticleIndex(filteredArticles.length - 1);
      return;
    }

    setCurrentArticleIndex(currentArticleIndex - 1);
  };

  return (
    <Container className="my-5">
      <h3 className="mb-4 text-center fw-bold">Our latest Stories:</h3>
      <Row className="justify-content-center">
        <Col md={3}>
        
          <Form>
          <span className="passwordSpan">
            {tags.map((tag) => (
              <label><Form.Check
                key={tag}
                type="checkbox"
                checked={tags.includes(tag)}
                onChange={() => handleTagChange(tag)}
              />{tag}</label>
            ))}
            </span>
          </Form>
          <Button variant="dark" className="align-items-center text-center" onClick={() => setTags(allTags)}><br></br>
  Show all articles
</Button><br></br>
        </Col>
        <Col md={6}>
          {filteredArticles.length === 0 ? (
            <p className="text-center">
              No articles match your filter.{" "}
            </p>
          ) : (
            <div className="d-flex justify-content-between align-items-center text-center">
              {newspaperMode && (
                <Button variant="primary" onClick={handlePreviousArticleClick}>
                  Previous
                </Button>
              )}
              <Button variant="primary" onClick={handleNewspaperModeToggle}>
                {newspaperMode ? "List" : "Newspaper"} Mode
              </Button>
              {newspaperMode && (
                <Button variant="primary" onClick={handleNextArticleClick}>
                  Next
                </Button>
              )}
            </div>
          )}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p>Sort by:</p>
            <div>
              <Button
                variant="primary"
                className={`text-${sortBy === "created_at" ? "primary" : "secondary"}`}
                onClick={() => handleSortClick("created_at")}
              >
                {" "}
                Date{" "}
              </Button>
              <Button
                variant="primary"
                className={`text-${sortBy === "title" ? "primary" : "secondary"}`}
                onClick={() => handleSortClick("title")}
              >
                {" "}
                Title{" "}
              </Button>
            </div>
            <div>
              <Button
                variant="link"
                className={`text-${sortOrder === "asc" ? "primary" : "secondary"}`}
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
              >
                {" "}
                {sortOrder === "asc" ? "▲" : "▼"}{" "}
              </Button>
            </div>
          </div>
          {newspaperMode ? (
            <Container fluid className="px-4">
              <Row noGutters className="bg-light">
                <Col className="p-3 d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="h1">The Daily Towner</div>
                  </div>
                </Col>
              </Row>
              <Row noGutters className="mb-5">
                <Col xs={12} md={8} className="p-3">
                  <h2 className="h1">
                    {filteredArticles[currentArticleIndex].title}
                  </h2>
                  <p className="lead">
                    {filteredArticles[currentArticleIndex].leadStory}
                  </p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: filteredArticles[currentArticleIndex].content,
                    }}
                  />
                  <div className="mt-4">
                    <p className="font-italic mb-0">By {filteredArticles[currentArticleIndex].author} - {filteredArticles[currentArticleIndex].created_at}</p>
                  </div>
                </Col>
                <Col xs={12} md={4} className="bg-dark text-light p-3">
                  <img src={filteredArticles[currentArticleIndex].mediaURL} alt={filteredArticles[currentArticleIndex].title} className="img-fluid mb-4" />
                </Col>
              </Row>
            </Container>
          ) : (
            filteredArticles.map((article) => (
              <Card className="mb-3" key={article.id}>
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Img variant="top" src={article.thumbnailURL} />
                  <Card.Text>{article.content}</Card.Text>
                  <Card.Text>Created on: {article.created_at}</Card.Text>
                  <Link to={`/articles/${article.id}`}>
                    <Button variant="primary">Read More</Button>
                  </Link>
                </Card.Body>
              </Card>
            )
            ))}
        </Col>
      </Row>
    </Container>
  );
}

export default Articles;