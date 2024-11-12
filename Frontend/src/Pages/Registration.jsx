import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Toast } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import LoginFrame from '../Homepage/HomepageImages/gears.jpg';
import { useRegisterUserMutation } from '../slices/usersApiSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const showNotification = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      showNotification('Please fill in all required fields correctly.', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showNotification('Passwords do not match!', 'error');
      return;
    }

    if (password.length < 6) {
      showNotification('Password must be at least 6 characters long!', 'error');
      return;
    }

    try {
      const res = await registerUser({ name, email, password }).unwrap();
      showNotification('Registration successful! Redirecting to login...', 'success');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      showNotification(err?.data?.message || 'Registration failed. Please try again.', 'error');
    }
  };

  return (
    <Container fluid className="vh-100 p-0 overflow-hidden">
      <Row className="h-100 g-0">
        {/* Left side - Image */}
        <Col md={6} className="d-none d-md-block h-100 p-0">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="h-100"
          >
            <div className="h-100" style={{ overflow: 'hidden' }}>
              <img
                src={LoginFrame}
                alt="Registration"
                className="w-100 h-100"
                style={{ 
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </div>
          </motion.div>
        </Col>

        {/* Right side - Registration Form */}
        <Col md={6} className="h-100 d-flex align-items-center justify-content-center" 
             style={{ backgroundColor: '#f8f9fa' }}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-100 px-4"
          >
            <Card className="border-0 shadow-lg mx-auto" 
                  style={{ maxWidth: '500px', backgroundColor: '#ffffff' }}>
              <Card.Body className="p-4">
                <h2 className="text-center mb-4" style={{ color: '#000000', fontWeight: 'bold' }}>
                  Create an Account
                </h2>

                <Form noValidate validated={validated} onSubmit={handleRegister}>
                  <Form.Group className="mb-3">
                    <Form.Label className="d-flex align-items-center">
                      <FaUser className="me-2" style={{ color: '#DAA520' }}/>
                      Full Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Enter your full name"
                      style={{ borderColor: '#DAA520', padding: '12px' }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your name.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="d-flex align-items-center">
                      <FaEnvelope className="me-2" style={{ color: '#DAA520' }}/>
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email"
                      style={{ borderColor: '#DAA520', padding: '12px' }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid email address.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="d-flex align-items-center">
                      <FaLock className="me-2" style={{ color: '#DAA520' }}/>
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter password"
                      style={{ borderColor: '#DAA520', padding: '12px' }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Password is required.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="d-flex align-items-center">
                      <FaLock className="me-2" style={{ color: '#DAA520' }}/>
                      Confirm Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      placeholder="Confirm password"
                      style={{ borderColor: '#DAA520', padding: '12px' }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please confirm your password.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    type="submit"
                    className="w-100 mb-3"
                    disabled={isLoading}
                    style={{ 
                      backgroundColor: '#000000',
                      borderColor: '#000000',
                      padding: '12px',
                      fontSize: '16px'
                    }}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>

                  <Button
                    variant="light"
                    className="w-100 d-flex align-items-center justify-content-center"
                    style={{ 
                      backgroundColor: '#ffffff',
                      borderColor: '#DAA520',
                      color: '#000000',
                      padding: '12px',
                      fontSize: '16px'
                    }}
                  >
                    <FaGoogle className="me-2" style={{ color: '#DAA520' }}/>
                    Sign up with Google
                  </Button>

                  <div className="text-center mt-4">
                    <p className="mb-0">
                      Already have an account?{' '}
                      <a
                        href="/login"
                        style={{ color: '#DAA520', textDecoration: 'none', fontWeight: 'bold' }}
                      >
                        Log in
                      </a>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Toast Notification */}
      <div style={{ 
        position: 'fixed', 
        top: 20, 
        right: 20, 
        zIndex: 1000 
      }}>
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)} 
          delay={3000} 
          autohide
          style={{
            backgroundColor: toastType === 'success' ? '#d4edda' : '#f8d7da',
            borderColor: toastType === 'success' ? '#c3e6cb' : '#f5c6cb'
          }}
        >
          <Toast.Header style={{
            backgroundColor: toastType === 'success' ? '#d4edda' : '#f8d7da',
            borderBottom: 'none'
          }}>
            {toastType === 'success' ? (
              <FaCheckCircle className="me-2 text-success" />
            ) : (
              <FaExclamationCircle className="me-2 text-danger" />
            )}
            <strong className="me-auto">
              {toastType === 'success' ? 'Success' : 'Error'}
            </strong>
          </Toast.Header>
          <Toast.Body style={{ color: toastType === 'success' ? '#155724' : '#721c24' }}>
            {toastMessage}
          </Toast.Body>
        </Toast>
      </div>
    </Container>
  );
};

export default RegistrationPage;