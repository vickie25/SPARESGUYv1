import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa'; // Install react-icons to use the star icon
import './PagesCSS/Reviews.css';
const reviewsData = [
  {
    id: 1,
    name: 'apbc africa',
    rating: 5,
    reviewText: 'Enhance your driving visibility with our premium Car Headlight, designed for optimal performance and safety. This high-quality headlight offers bright, clear illumination, ensuring excellent road visibility even in low-light or harsh weather conditions. Built with durable materials.',
    datePosted: 'Sept 12, 2024',
  },
  {
    id: 2,
    name: 'apbc africa',
    rating: 5,
    reviewText: 'Enhance your driving visibility with our premium Car Headlight, designed for optimal performance and safety. This high-quality headlight offers bright, clear illumination, ensuring excellent road visibility even in low-light or harsh weather conditions. Built with durable materials.',
    datePosted: 'Sept 12, 2024',
  }
];

const Reviews = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Review submitted!');
  };

  return (
    <div className="review-section">
      <h2>Customer Reviews</h2>

      <div className="reviews-list">
        {reviewsData.map((review) => (
          <div className="review" key={review.id}>
            <div className="review-header">
              <div className="profile">
                <div className="profile-img"></div>
                <div className="profile-name">{review.name}</div>
              </div>
              <div className="rating">
                {Array(5).fill().map((_, i) => (
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
