import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './PagesCSS/Reviews.css';

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
      }); qq3
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
    <Container fluid className="review-section py-4">
      <h2>Customer Reviews</h2>

      {isLoading && <p>Loading reviews...</p>}
      {error && <p className="error">{error}</p>}

      <Row className="reviews-list">
        {reviews.map((review) => (
          <Col md={4} className="review mb-4" key={review.id}>
            <div className="review-header d-flex align-items-center">
              <div className="profile me-3">
                <div className="profile-img"></div>
                <div className="profile-name">{review.name}</div>
              </div>
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
            <p>{review.reviewText}</p>
            <div className="review-footer">
              <span>Posted on {review.datePosted}</span>
            </div>
          </Col>
        ))}
      </Row>

      <div className="add-review mt-4">
        <h3>Add Your Review</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formRating">
            <Form.Label>Your Rating</Form.Label>
            <div className="stars">
              {Array(5)
                .fill()
                .map((_, i) => (
                  <FaStar
                    key={i}
                    size={24}
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
            />
          </Form.Group>

          <Form.Group controlId="formReview" className="mb-3">
            <Form.Label>Your Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="review"
              value={formData.review}
              onChange={handleInputChange}
              placeholder="Enter Your Review"
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary">Submit</Button>
        </Form>
      </div>
    </Container>
  );
};

export default Reviews;
