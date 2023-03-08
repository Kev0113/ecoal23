import React from "react";
import { Route, Link, Routes } from "react-router-dom";
import './App.css';
import { useCookies } from 'react-cookie';

import Header from "./Component/Header";
import Register from "./Component/Register";
import Login from "./Component/Login";
import Home from "./Component/Home";
import Footer from "./Component/Footer";
import Articles from "./Component/Articles";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['mycookie']);

  return (
    <div className="wrapper">
      <Header cookies={cookies} removeCookie={removeCookie} />


      <Routes>
        <Route exact={true} path="/" element={<Home cookies={cookies} />} />
        <Route exact={true} path="/register" element={<Register/>} />
        <Route exact={true} path="/login" element={<Login cookies={cookies} setCookie={setCookie} />} />
        <Route exact={true} path="/articles" element={<Articles cookies={cookies} />} />
        <Route path="*" element={() => <p>Page Not Found</p>} />
      </Routes>

      <Footer />
    </div>
  );
}


export default App;
