import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './HomepageCSS/Footer.css';
  
const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Top Cities</h5>
            <ul>
              <li>Kenya</li>
              <li>Uganda</li>
              <li>Tanzania</li>
              <li>Rwanda</li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Subscribe to our newsletter</h5>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Subscribe
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <a href="https://facebook.com" className="text-white mx-2"><i className="fab fa-facebook-f"></i></a>
            <a href="https://twitter.com" className="text-white mx-2"><i className="fab fa-twitter"></i></a>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p>©2022 My Spares Guy. All rights reserved.</p>
            <a href="#privacy" className="text-white mx-2">Privacy Policy</a>
            <a href="#terms" className="text-white mx-2">Terms & Conditions</a>
            <a href="#accessibility" className="text-white mx-2">Accessibility</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;