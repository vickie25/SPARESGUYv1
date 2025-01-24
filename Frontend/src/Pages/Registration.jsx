import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Toast } from "react-bootstrap";
import { FaUser, FaEnvelope, FaLock, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRegisterUserMutation } from "../slices/usersApiSlice";
import LoginFrame from "../Homepage/HomepageImages/gears.jpg";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleSignIn from "./GoogleSignIn"; 
import axios from "axios";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

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

    if (!form.checkValidity() || password !== confirmPassword) {
      setValidated(true);
      showNotification(
        password !== confirmPassword
          ? "Passwords do not match!"
          : "Please fill in all required fields correctly.",
        "error"
      );
      return;
    }

    try {
      const res = await registerUser({ name, email, password }).unwrap();
      showNotification("Registration successful! Redirecting to login...", "success");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      showNotification(err?.data?.message || "Registration failed. Please try again.", "error");
    }
  };

  const handleGoogleSuccess = async (tokenResponse) => {
    try {
      const res = await axios.post("/api/auth/google", {
        token: tokenResponse.access_token,
      });
      showNotification("Google sign-in successful! Redirecting...", "success");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      showNotification("Google sign-in failed. Please try again.", "error");
    }
  };

  const handleGoogleError = () => {
    showNotification("Google sign-in was unsuccessful. Try again later.", "error");
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Container fluid className="vh-100 p-0 overflow-hidden">
        <Row className="h-100 g-0">
          {/* Left Image Section */}
          <Col md={6} className="d-none d-md-block h-100 p-0">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="h-100"
            >
              <img
                src={LoginFrame}
                alt="Registration"
                className="w-100 h-100"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </motion.div>
          </Col>

          {/* Registration Form */}
          <Col md={6} className="h-100 d-flex align-items-center justify-content-center bg-light">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="w-100 px-4"
            >
              <Card className="border-0 shadow-lg mx-auto" style={{ maxWidth: "500px" }}>
                <Card.Body className="p-4">
                  <h2 className="text-center mb-4 fw-bold">Create an Account</h2>
                  <Form noValidate validated={validated} onSubmit={handleRegister}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <FaUser className="me-2 text-warning" />
                        Full Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Enter your full name"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter your name.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>
                        <FaEnvelope className="me-2 text-warning" />
                        Email Address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid email address.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>
                        <FaLock className="me-2 text-warning" />
                        Password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter password"
                      />
                      <Form.Control.Feedback type="invalid">
                        Password is required.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>
                        <FaLock className="me-2 text-warning" />
                        Confirm Password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Confirm password"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please confirm your password.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button
                      type="submit"
                      className="w-100 mb-3"
                      disabled={isLoading}
                      style={{ backgroundColor: "#000", color: "#fff" }}
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </Form>

                  <div className="text-center mt-4">
                    <p>Or sign up with Google:</p>
                    <GoogleSignIn onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Toast Notification */}
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          className={`toast ${toastType === "success" ? "bg-success" : "bg-danger"}`}
          style={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}
        >
          <Toast.Header closeButton={false}>
            {toastType === "success" ? (
              <FaCheckCircle className="me-2 text-success" />
            ) : (
              <FaExclamationCircle className="me-2 text-danger" />
            )}
            <strong className="me-auto">{toastType === "success" ? "Success" : "Error"}</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default Registration;
