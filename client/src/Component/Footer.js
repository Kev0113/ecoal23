import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaPhone, FaFax, FaEnvelope } from 'react-icons/fa';
import { RiFacebookFill, RiTwitterFill, RiInstagramFill, RiLinkedinFill } from 'react-icons/ri';


import '../css/footer.css';

function Footer() {
  return (
    <div className="container-fluid footer">
      <footer className="py-5 ff" style={{ backgroundColor: "#212529", color:"#faf2e6" }}>
        <Container>
          <Row>
            <Col sm={6} md={3} className="mb-3">
              <h5>Links</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a href="/" className="nav-link p-0 same">Home</a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/teams" className="nav-link p-0 same">News</a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/fixtures" className="nav-link p-0 same">Search</a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/statistics" className="nav-link p-0 same">Register</a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/players" className="nav-link p-0 same">Login</a>
                </li>
              </ul>
            </Col>

            <Col sm={6} md={3} className="mb-3 address">
              <h5>Our Address</h5>
              <address>
                8, Oriel House<br />
                Dublin Road, Dundalk<br />
                County Louth<br />
                <FaPhone />: +353 85 2155 782<br />
                <FaFax />: +353 85 2155 782<br />
                <FaEnvelope />: <a className="link-primary" href="mailto:d00251785@student.dkit.ie">d00251785@student.dkit.ie</a>
              </address>
            </Col>

            <Col md={5} className="offset-md-1 mb-3">
              <form>
                <h5>Subscribe to our newsletter</h5>
                <p>Monthly digest of what's new and exciting from us.</p>
                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                  <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                  <input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
                  <button className="btn bg-info" type="button">Subscribe</button>
                </div>
              </form>
            </Col>
          </Row>

          <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
            <p className="text-muted" style={{ color: 'white' }}>
              © 2023 The Daily Towner, Inc. All rights reserved.
            </p>
            <ul className="list-unstyled d-flex">
              <li>
                <a className="text-muted" href="#">
                  <RiFacebookFill className="af" />
                </a>
              </li>
              <li>
                <a className="text-muted" href="#">
                  <RiTwitterFill className="af" />
                </a>
              </li>
              <li>
                <a className="text-muted" href="#">
                  <RiInstagramFill className="af" />
                </a>
                </li>
                <li>
                    <a className="text-muted" href="#">
                        <RiLinkedinFill className="af" />
                    </a>
                </li>
            </ul>
            </div>
        </Container>
        </footer>
    </div>
    );
}

export default Footer;