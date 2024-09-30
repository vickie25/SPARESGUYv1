import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './HomepageCSS/Statistics.css'
const Statistics = () => {
  return (
    <div className="statistics bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={4} className="text-center">
            <h3>3</h3>
            <p>Years in Business</p>
          </Col>
          <Col md={4} className="text-center">
            <h3>34K+</h3>
            <p>Happy Clients</p>
          </Col>
          <Col md={4} className="text-center">
            <h3>34K+</h3>
            <p>Delivered Items</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Statistics;