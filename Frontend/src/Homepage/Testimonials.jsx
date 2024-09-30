import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './HomepageCSS/Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    { id: 1, name: 'Lynn Akinyi', text: 'Great service and quality products!', rating: 5 },
    { id: 2, name: 'David Kinyanjui', text: 'Excellent customer service.', rating: 4 }
  ];

  return (
    <Container className="my-5">
      <h2 className="text-center">Customer Testimonials</h2>
      <Row>
        {testimonials.map(testimonial => (
          <Col key={testimonial.id} xs={12} md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{testimonial.name}</Card.Title>
                <Card.Text>{testimonial.text}</Card.Text>
                <Card.Text>{'⭐'.repeat(testimonial.rating)}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Testimonials;