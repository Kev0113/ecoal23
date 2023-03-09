import React from "react";
import { Route, Link, Routes } from "react-router-dom";
import './App.css';
import { useCookies } from 'react-cookie';
import { useState } from "react";

import Header from "./Component/Header";
import Register from "./Component/Register";
import Login from "./Component/Login";
import Home from "./Component/Home";
import Footer from "./Component/Footer";
import Articles from "./Component/Articles";
import Article from "./Component/Article";
import Profile from "./Component/Profile";
import DeleteAccount from "./Component/DeleteAccount";
import AddArticle from "./Component/AddArticle";
import ManageArticle from "./Component/ManageArticle";
import EditArticle from "./Component/EditArticle";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['mycookie']);
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="wrapper">

      <Header cookies={cookies} removeCookie={removeCookie} handleSearchChange={handleSearchChange} searchTerm={searchTerm} />

      <Routes>
        <Route exact={true} path="/" element={<Home cookies={cookies} />} />
        <Route exact={true} path="/register" element={<Register />} />
        <Route exact={true} path="/login" element={<Login cookies={cookies} setCookie={setCookie} />} />
        <Route path="/articles" element={<Articles searchTerm={searchTerm} />} />
        <Route path="/articles/:id" element={<Article />} />
        <Route path="/profile" element={<Profile cookies={cookies} />} />
        <Route path="/delete-account" element={<DeleteAccount cookies={cookies} removeCookie={removeCookie} />} />
        <Route path="/add-article" element={<AddArticle cookies={cookies} />} />
        <Route path="/manage-article" element={<ManageArticle cookies={cookies} />} />
        <Route path="/edit-article/:id" element={<EditArticle cookies={cookies}/>} />
        <Route path="*" element={() => <p>Page Not Found</p>} />
      </Routes>

      <Footer />
    </div>
  );
}


export default App;
