import React, { useState } from 'react';
import { Form, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../Homepage/Header';
import Footer from '../Homepage/Footer';
import mpesa from '../Homepage/HomepageImages/mpesa.svg';
import card from '../Homepage/HomepageImages/card.png';
import PaymentConfirmation from './PaymentConfirmation';

const Payment = () => {
  const [validated, setValidated] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const counties = [
    "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Uasin Gishu",
    "Kiambu", "Murang'a", "Machakos", "Nyeri", "Meru",
    "Bungoma", "Kakamega", "Kisii", "Homa Bay", "Kericho",
    "Laikipia", "Trans Nzoia", "Elgeyo-Marakwet", "Kilifi", "Bomet",
    "Embu", "Nyandarua", "Siaya", "Migori", "Kirinyaga",
    "Narok", "Kitui", "Tharaka-Nithi", "Nandi", "Samburu",
    "Kajiado", "Vihiga", "Nyamira", "Kwale", "Taita-Taveta",
    "West Pokot", "Garissa", "Wajir", "Mandera", "Marsabit",
    "Isiolo", "Turkana", "Lamu", "Tana River", "Baringo",
    "Busia"
  ];

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const openConfirmationModal = () => {
    setShowConfirmation(true);
  };

  const closeConfirmationModal = () => {
    setShowConfirmation(false);
    navigate('/');
  };

  return (
    <>
      <Header />
      <div className="checkout-container d-flex justify-content-center">
        <Row className="w-75">
          <Col md={8}>
            <Card className="p-3 mb-3">
              <Card.Title className="text-center">Delivery Information</Card.Title>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control required type="text" placeholder="Enter Your Name" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control required type="email" placeholder="Enter your email address" />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formMobile">
                      <Form.Label>Mobile</Form.Label>
                      <Form.Control required type="text" placeholder="Enter mobile number" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formCity">
                      <Form.Label>City</Form.Label>
                      <Form.Control as="select" required>
                        <option>Select city</option>
                        {counties.map((county, index) => (
                          <option key={index} value={county}>
                            {county}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="formBuilding">
                  <Form.Label>Building</Form.Label>
                  <Form.Control type="text" placeholder="Enter building name" />
                </Form.Group>
              </Form>
            </Card>

            <Card className="p-3 mb-3">
              <Card.Title className="text-center">Schedule Delivery</Card.Title>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formNote">
                    <Form.Label>Note</Form.Label>
                    <Form.Control type="text" placeholder="Type your note" />
                  </Form.Group>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="p-3">
              <Card.Title className="text-center">Payment Method</Card.Title>
              <Form.Group controlId="formPaymentMethod">
                <div className="d-flex justify-content-around">
                  <div className="d-flex align-items-center mb-2">
                    <img src={card} alt="card" width={24} height={25} className="me-2" />
                    <Form.Check
                      type="radio"
                      label="Credit/Debit card"
                      name="paymentMethod"
                      id="creditDebit"
                      defaultChecked
                    />
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <Form.Check
                      type="radio"
                      label="Cash on Delivery"
                      name="paymentMethod"
                      id="cashOnDelivery"
                    />
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <img src={mpesa} alt="Mpesa" width={24} height={24} className="me-2" />
                    <Form.Check 
                      type="radio"
                      label="Mpesa"
                      name="paymentMethod"
                      id="mpesa"
                    />
                  </div>
                </div>
              </Form.Group>
            </Card>
          </Col>
        </Row>
        <div className="d-flex justify-content-center mt-3">
            <Button
              className="confirm-button"
              onClick={openConfirmationModal}
              style={{ backgroundColor: '#000', width: '150px', height: '40px', marginTop: '150px', marginRight: '200px' }}
            >
              Confirm Payment
            </Button>
        </div>

        <PaymentConfirmation show={showConfirmation} onClose={closeConfirmationModal} />
      </div>
      <Footer />
    </>
  );
};

export default Payment;
