import React from "react";
import { Route, Link, Routes } from "react-router-dom"
import logo from './logo.svg';
import './App.css';

import Register from "./Component/Register";
import Login from "./Component/Login";
import Home from "./Component/Home";

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route exact={true} path="/" element={<Home/>} />
        <Route exact={true} path="/register" element={<Register />} />
        <Route exact={true} path="/login" element={<Login />} />
        <Route path="*" element={() => <p>Page Not Found</p>} />
      </Routes>
    </>
  );
}

export default App;
