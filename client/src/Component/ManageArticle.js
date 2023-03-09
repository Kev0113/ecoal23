import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Container, Table, Button } from "react-bootstrap";
import axios from "axios";

function ManageArticle() {
  const [articles, setArticles] = useState([]);
  const [cookies] = useCookies(['mycookie']);
  
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
    return article.email === cookies.mycookie.email;
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/articles/${id}`);
      setArticles(articles.filter(article => article.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-5">Manage Articles</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Thumbnail URL</th>
            <th>Media Type</th>
            <th>Media URL</th>
            <th>Lead Story</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredArticles.map((article) => (
            <tr key={article.id}>
              <td>{article.id}</td>
              <td>{article.title}</td>
              <td>{article.content}</td>
              <td>{article.thumbnailURL}</td>
              <td>{article.mediaType}</td>
              <td>{article.mediaURL}</td>
              <td>{article.leadStory}</td>
              <td>{article.createdAt}</td>
              <td>{article.updatedAt}</td>
              <td>
                <Button variant="primary" href={`/edit/${article.id}`}>
                  Edit
                </Button>
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
