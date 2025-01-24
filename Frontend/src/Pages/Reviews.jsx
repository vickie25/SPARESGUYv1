import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    review: '',
    rating: 0,
  });
  const [hover, setHover] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/reviews');
        if (!response.ok) throw new Error('Failed to fetch reviews');
        const data = await response.json();
        setReviews(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = { ...formData };
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      });
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.message || 'Failed to submit review');
      }
      const savedReview = await response.json();
      setReviews([...reviews, savedReview]);
      setFormData({ name: '', email: '', review: '', rating: 0 });
      alert('Review submitted!');
    } catch (error) {
      console.error('Error submitting review:', error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <Container fluid className="review-section py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#333' }}>
        Customer Reviews
      </h2>

      {isLoading && <p className="text-center">Loading reviews...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      <Row className="reviews-list">
        {reviews.map((review) => (
          <Col md={4} className="mb-4" key={review.id}>
            <Card style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3">
                    <div
                      className="profile-img"
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: '#e4e5e9',
                      }}
                    ></div>
                  </div>
                  <div>
                    <h5 className="mb-0" style={{ fontWeight: 'bold' }}>
                      {review.name}
                    </h5>
                    <div className="rating">
                      {Array(5)
                        .fill()
                        .map((_, i) => (
                          <FaStar
                            key={i}
                            color={i < review.rating ? '#ffc107' : '#e4e5e9'}
                          />
                        ))}
                    </div>
                  </div>
                </div>
                <Card.Text>{review.reviewText}</Card.Text>
                <div className="text-muted" style={{ fontSize: '14px' }}>
                  Posted on {review.datePosted}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div
        className="add-review mt-5 mx-auto"
        style={{
          maxWidth: '700px',
          padding: '30px',
          borderRadius: '15px',
          backgroundColor: '#fff',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h3 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#333' }}>
          Add Your Review
        </h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formRating" className="mb-3">
            <Form.Label>Your Rating</Form.Label>
            <div className="stars d-flex gap-2">
              {Array(5)
                .fill()
                .map((_, i) => (
                  <FaStar
                    key={i}
                    size={32}
                    color={i < (hover || formData.rating) ? '#ffc107' : '#e4e5e9'}
                    onMouseEnter={() => setHover(i + 1)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => handleRatingChange(i + 1)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
            </div>
          </Form.Group>

          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Your Name"
              required
              style={{
                padding: '12px',
                fontSize: '16px',
                borderRadius: '8px',
                border: '1px solid #ddd',
              }}
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter Your Email"
              required
              style={{
                padding: '12px',
                fontSize: '16px',
                borderRadius: '8px',
                border: '1px solid #ddd',
              }}
            />
          </Form.Group>

          <Form.Group controlId="formReview" className="mb-4">
            <Form.Label>Your Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="review"
              value={formData.review}
              onChange={handleInputChange}
              placeholder="Enter Your Review"
              required
              style={{
                padding: '12px',
                fontSize: '16px',
                borderRadius: '8px',
                border: '1px solid #ddd',
              }}
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              borderRadius: '8px',
              backgroundColor: '#007bff',
              border: 'none',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            Submit Review
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Reviews;
