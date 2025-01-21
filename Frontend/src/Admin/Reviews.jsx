import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Badge, Alert, Modal } from 'react-bootstrap';
import { FaTrash, FaEye } from 'react-icons/fa';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  // Fetch Reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (!response.ok) throw new Error('Failed to fetch reviews');
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error.message);
      }
    };

    fetchReviews();
  }, []);

  // Alert handler
  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  // Delete review
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        const response = await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete review');
        setReviews(reviews.filter((review) => review.id !== id));
        showAlert('Review deleted successfully!', 'success');
      } catch (error) {
        console.error('Error deleting review:', error.message);
        showAlert('Error deleting review!', 'danger');
      }
    }
  };

  // View review
  const handleView = (review) => {
    setSelectedReview(review);
    setShowModal(true);
  };

  return (
    <Container fluid className="py-4">
      <h2>Manage Customer Reviews</h2>

      {alert.show && (
        <Alert variant={alert.type} onClose={() => setAlert({ show: false })} dismissible>
          {alert.message}
        </Alert>
      )}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Product</th>
            <th>Customer Name</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td>{review.productName}</td>
              <td>{review.name}</td>
              <td>
                <Badge bg="warning">{review.rating} / 5</Badge>
              </td>
              <td>
                {review.reviewText.length > 50
                  ? `${review.reviewText.substring(0, 50)}...`
                  : review.reviewText}
              </td>
              <td>{new Date(review.datePosted).toLocaleDateString()}</td>
              <td>
                <Button variant="info" onClick={() => handleView(review)}>
                  <FaEye /> View
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(review.id)}>
                  <FaTrash /> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal to view review details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Review Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReview && (
            <>
              <p><strong>Product:</strong> {selectedReview.productName}</p>
              <p><strong>Customer Name:</strong> {selectedReview.name}</p>
              <p><strong>Email:</strong> {selectedReview.email}</p>
              <p><strong>Rating:</strong> {selectedReview.rating} / 5</p>
              <p><strong>Review:</strong> {selectedReview.reviewText}</p>
              <p><strong>Date Posted:</strong> {new Date(selectedReview.datePosted).toLocaleString()}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminReviews;
