import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
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
    <div className="review-section">
      <h2>Customer Reviews</h2>

      {isLoading && <p>Loading reviews...</p>}
      {error && <p className="error">{error}</p>}

      <div className="reviews-list">
        {reviews.map((review) => (
          <div className="review" key={review.id}>
            <div className="review-header">
              <div className="profile">
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
          </div>
        ))}
      </div>

      <div className="add-review">
        <h3>Add Your Review</h3>
        <form onSubmit={handleSubmit}>
          <div className="rating-input">
            <label>Your Rating</label>
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
          </div>

          <div className="input-field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Your Name"
              required
            />
          </div>

          <div className="input-field">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div className="input-field">
            <label>Your Review</label>
            <textarea
              name="review"
              value={formData.review}
              onChange={handleInputChange}
              placeholder="Enter Your Review"
              required
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
