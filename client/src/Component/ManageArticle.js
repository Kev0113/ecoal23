import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Container, Table, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

function ManageArticle() {
  const [articles, setArticles] = useState([]);
  const [cookies] = useCookies(['mycookie']);

  console.log(cookies.mycookie.userId);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/articles"
        );
        setArticles(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const filteredArticles = articles.filter(article => {
    return article.user_email === cookies.mycookie.email;
  });

  const handleDelete = async (id) => {
    try {
      const token = cookies.mycookie.token;
      await axios.get(`http://127.0.0.1:8000/api/articles/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // await axios.get(`http://127.0.0.1:8000/api/articles/delete/${id}`);
      setArticles(articles.filter(article => article.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="my-5">
      <h3 className="mb-4 text-center fw-bold">Manage Articles</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredArticles.map((article) => (
            <tr key={article.id}>
              <td className = "manageArticleData">{article.id}</td>
              <td className = "manageArticleData">{article.title}</td>
              <td className = "manageArticleData">{article.content}</td>
              <td>
                <Link to={`/edit-article/${article.id}`}>
                  <Button variant="primary">Edit</Button>
                </Link>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(article.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ManageArticle;
