import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import './PagesCSS/Reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch reviews when the component mounts
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/reviews'); // Replace with your actual API endpoint
        const data = await response.json();
        setReviews(data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load reviews');
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = { name, email, reviewText: review, rating };

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) throw new Error('Failed to submit review');

      const savedReview = await response.json();
      setReviews([...reviews, savedReview]); // Update state with new review
      setName('');
      setEmail('');
      setReview('');
      setRating(0);
      alert('Review submitted!');
    } catch (err) {
      setError('Failed to submit review');
    }
  };

  return (
    <div className="review-section">
      <h2>Customer Reviews</h2>

      {isLoading && <p>Loading reviews...</p>}
      {error && <p>{error}</p>}

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
        <h3>Add your review</h3>
        <form onSubmit={handleSubmit}>
          <div className="rating-input">
            <label>Your Rating</label>
            <div className="stars">
              {Array(5).fill().map((_, i) => (
                <FaStar
                  key={i}
                  size={24}
                  color={i < (hover || rating) ? '#ffc107' : '#e4e5e9'}
                  onMouseEnter={() => setHover(i + 1)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => setRating(i + 1)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div>
          </div>

          <div className="input-field">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
              required
            />
          </div>

          <div className="input-field">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div className="input-field">
            <label>Your Review</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
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
