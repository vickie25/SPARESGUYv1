import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './HomepageCSS/FeaturedProducts.css';
import plugs from './Homepageimages/plugs.svg'
import rearlights from './HomepageImages/rearlights.svg'

const FeaturedProducts = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60 * 60); // 25 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = seconds => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const products = [
    { id: 1, name: 'Plugs', description: 'Durable Engine plugs', price: 50, imageUrl: 'plugs' },
    { id: 2, name: 'Rear Lights', description: 'High-quality rear lights', price: 20, imageUrl: 'rearlights' }
  ];

  return (
    <Container className="my-5">
      <h2 className="text-center">HURRY UP! 70% OFF ON ALL PRODUCTS THIS WEEK ONLY</h2>
      <p className="text-center">Time left: {formatTime(timeLeft)}</p>
      <Row>
        {products.map(product => (
          <Col key={product.id} xs={12} md={6} lg={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src={plugs} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>ksh{product.price}</Card.Text>
                <Button variant="primary">Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FeaturedProducts;