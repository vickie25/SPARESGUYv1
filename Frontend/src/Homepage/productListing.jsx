import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './HomepageCSS/ProductListing.css';
import rearlights from './Homepageimages/rearlights.svg'

const ProductListing = () => {
  const products = [
    { id: 1, name: 'Air Filter', price: 253.00, imageUrl: '/path/to/air-filter.jpg' },
    { id: 2, name: 'Brake Pads', price: 150.00, imageUrl: '/path/to/brake-pads.jpg' },
    { id: 3, name: 'Spark Plugs', price: 75.00, imageUrl: '/path/to/spark-plugs.jpg' },
    { id: 4, name: 'Oil Filter', price: 50.00, imageUrl: '/path/to/oil-filter.jpg' }
  ];

  return (
    <Container className="my-5">
      <Row>
        {products.map(product => (
          <Col key={product.id} xs={12} md={6} lg={3}>
            <Card className="mb-4">
              <Card.Img variant="top" src={rearlights} />
              {/* <Card.Img variant="top" src={product.imageUrl} /> */}
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Ksh{product.price.toFixed(2)}</Card.Text>
                <Button variant="primary">Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductListing;