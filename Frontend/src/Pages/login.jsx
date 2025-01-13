import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../slices/usersApiSlice';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { FaEnvelope, FaLock, FaSignInAlt, FaUserPlus, FaCog } from 'react-icons/fa';
import LoginFrame from '../Homepage/HomepageImages/gears.jpg';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
  
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
  
    try {
      const credentials = { email, password };
      const res = await loginUser(credentials).unwrap();
      console.log(res, "response of logged user")
      const role = res.user.role;

      toast.success('Login successful! Redirecting...', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

     // Convert the user object to a JSON string and store it
localStorage.setItem('userInfo', JSON.stringify(res.user));

// Retrieve and parse the stored JSON string back to an object
const userInfo = JSON.parse(localStorage.getItem('userInfo'));
console.log(userInfo); // Now you should get your user object

  
      setTimeout(() => {
        if (role === 'admin') {
          navigate('/admin/dashboard'); // Redirect admin to admin dashboard
        } else {
          navigate('/shop'); // Redirect customer to shop
        }
      }, 2000);
  
      console.log('Login successful:', res);
    } catch (err) {
      toast.error(err?.data?.message || 'Login failed. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error('Login failed:', err);
    }
  };
  
  return (
    <Container fluid className="vh-100 p-0">
      <Row className="h-100 m-0">
        <Col md={6} className="p-0 d-flex align-items-center justify-content-center position-relative overflow-hidden">
          <div className="h-100 w-100 position-absolute" 
               style={{
                 background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${LoginFrame})`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
               }}>
          </div>
          <div className="position-relative text-white text-center px-4">
            <FaCog className="mb-4" style={{ fontSize: '3rem', animation: 'spin 4s linear infinite', color: '#DAA520' }} />
            <h1 className="display-4 fw-bold mb-3" style={{ color: '#DAA520' }}>MYSPARES GUY Auto Parts Hub</h1>
            <p className="lead fs-4">Your trusted source for quality spare parts</p>
            <div className="mt-4 p-3" style={{ background: 'rgba(218, 165, 32, 0.1)', borderRadius: '10px', border: '1px solid #DAA520' }}>
              <p className="mb-0">Access your account to explore our extensive catalog of authentic spare parts</p>
            </div>
          </div>
        </Col>

        <Col md={6} className="d-flex align-items-center justify-content-center" 
             style={{ background: '#000000' }}>
          <Card className="shadow-lg border-0" 
                style={{ 
                  width: '90%', 
                  maxWidth: '450px',
                  borderRadius: '15px',
                  background: '#FFFFFF',
                  border: '1px solid #DAA520'
                }}>
            <Card.Body className="p-4 p-md-5">
              <h2 className="text-center mb-4 fw-bold" style={{ color: '#000000' }}>Access Your Account</h2>
              <Form noValidate validated={validated} onSubmit={handleLogin}>
                <Form.Group className="mb-4" controlId="formEmail">
                  <Form.Label className="d-flex align-items-center fw-medium" style={{ color: '#000000' }}>
                    <FaEnvelope className="me-2" style={{ color: '#DAA520' }} /> Email Address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleChange}
                    required
                    className="py-2 custom-input"
                    style={{ borderRadius: '8px', borderColor: '#DAA520' }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label className="d-flex align-items-center fw-medium" style={{ color: '#000000' }}>
                    <FaLock className="me-2" style={{ color: '#DAA520' }} /> Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handleChange}
                    required
                    className="py-2 custom-input"
                    style={{ borderRadius: '8px', borderColor: '#DAA520' }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide your password.
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  variant="custom"
                  type="submit"
                  className="w-100 mb-3 py-2 custom-button"
                  disabled={isLoading}
                  style={{ 
                    borderRadius: '8px',
                    background: '#000000',
                    color: '#FFFFFF',
                    border: '1px solid #DAA520'
                  }}
                >
                  <FaSignInAlt className="me-2" />
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>

                <Button
                  variant="link"
                  className="w-100 mb-3 text-decoration-none"
                  onClick={() => navigate('/forgot-password')}
                  style={{ color: '#DAA520' }}
                >
                  Forgot Password?
                </Button>

                <div className="text-center">
                  <p className="mb-0" style={{ color: '#000000' }}>
                    New to MYSPARES GUY Auto Parts?{' '}
                    <Button
                      variant="link"
                      className="text-decoration-none p-0"
                      onClick={() => navigate('/registration')}
                      style={{ color: '#DAA520' }}
                    >
                      <FaUserPlus className="me-1" />
                      Create Account
                    </Button>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer />

      
    </Container>
  );
};

export default LoginPage;

<style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .custom-input:focus {
            border-color: #DAA520 !important;
            box-shadow: 0 0 0 0.25rem rgba(218, 165, 32, 0.25) !important;
          }
          
          .custom-button:hover {
            background: #DAA520 !important;
            color: #000000 !important;
            transform: translateY(-1px);
            transition: all 0.3s ease;
          }

          .form-control {
            border-color: #DAA520;
          }

          .form-control:focus {
            border-color: #DAA520;
            box-shadow: 0 0 0 0.25rem rgba(218, 165, 32, 0.25);
          }
        `}
      </style>