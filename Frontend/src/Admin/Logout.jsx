import React, { useState } from 'react';
import { Button, Modal, Container, Row, Col } from 'react-bootstrap';
import { FaSignOutAlt, FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';  // Updated import
import styled from 'styled-components';

// Styled Components
const LogoutButton = styled(Button)`
  background-color: #DAA520;
  border: none;
  color: #FFFFFF;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #c7911f;
  }
`;

const PageTitle = styled.h2`
  color: #DAA520;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const ConfirmationText = styled.p`
  font-size: 1.1rem;
  color: #000000;
  margin-bottom: 20px;
`;

const Icon = styled(FaExclamationTriangle)`
  color: #DAA520;
  font-size: 3rem;
  margin-bottom: 20px;
`;

const Logout = () => {
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const navigate = useNavigate();  // Using the useNavigate hook for navigation

  // Handle the logout action
  const handleLogout = () => {
    // You can add your logout logic here (e.g., clearing session storage, tokens)
    localStorage.removeItem('authToken'); // Example: Remove auth token from localStorage
    navigate('/login');  // Redirect to the login page after logging out
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col md={6}>
          <PageTitle>Admin Logout</PageTitle>

          {/* Logout Button */}
          <LogoutButton onClick={toggleModal}>
            <FaSignOutAlt style={{ marginRight: '8px' }} />
            Logout
          </LogoutButton>

          {/* Logout Confirmation Modal */}
          <Modal show={showModal} onHide={toggleModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>
                <Icon />
                Are you sure you want to log out?
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ConfirmationText>
                You will be logged out of your admin session. Any unsaved data may be lost.
              </ConfirmationText>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={toggleModal}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleLogout}>
                Yes, Logout
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default Logout;
