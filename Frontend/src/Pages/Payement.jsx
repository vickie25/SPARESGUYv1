import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Card, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../Homepage/Header';
import Footer from '../Homepage/Footer';
import mpesa from '../Homepage/HomepageImages/mpesa.svg';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useGetPaypalClientIdQuery } from "../slices/transactionApiSlice";

import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext'

const Payment = () => {
    const [validated, setValidated] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();
    const counties = [
        "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Uasin Gishu",
        "Kiambu", "Murang'a", "Machakos", "Nyeri", "Meru",
        "Bungoma", "Kakamega", "Kisii", "Homa Bay", "Kericho",
        "Laikipia", "Trans Nzoia", "Elgeyo-Marakwet", "Kilifi",
        "Bomet", "Embu", "Nyandarua", "Siaya", "Migori",
        "Kirinyaga", "Narok", "Kitui", "Tharaka-Nithi",
        "Nandi", "Samburu", "Kajiado", "Vihiga",
        "Nyamira", "Kwale", "Taita-Taveta",
        "West Pokot", "Garissa", "Wajir",
        "Mandera", "Marsabit", "Isiolo",
        "Turkana", "Lamu", "Tana River",
        "Baringo", "Busia"
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

    const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPaypalClientIdQuery();

const clientId = paypal?.clientId;

const { calculateGrandTotal } = useCart();
      // Calculate total price from CartContext
      const totalPrice = calculateGrandTotal();

      const createOrder = (data, actions) => {
          return actions.order.create({
              purchase_units: [{
                  amount: { value: totalPrice.toString() } // Ensure value is a string
              }]
          });
      };
  
      const onApprove = (data, actions) => {
          return actions.order.capture().then(function(details) {
              console.log(details);
              toast.success("Payment Successful");
              // Optionally navigate or perform other actions here
          });
      };
  
      const onError = (error) => {
          toast.error("Payment Failed");
          console.log(error);
          navigate('/payment');


    return (
        <PayPalScriptProvider options={{ 'client-id': 'AQQ5fKyqjEygOr9OJ3Mu7v7c0Mjs6-HkHyt1FYPNcOOsFP2zWKRp1pu_yQddwyvY2hyZC24a6h_lshHk', currency: 'USD' }}>
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
                                                    <option key={index} value={county}>{county}</option>
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

                        {/* Schedule Delivery */}
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

                    {/* Payment Method */}
                    <Col md={4}>
                        <Card className="p-3">
                            <Card.Title className="text-center">Payment Method</Card.Title>
                            <ListGroup variant='flush'>
                                {/* PayPal Payment */}
                                <ListGroup.Item className="text-center">
                                    <h2>Payment Method</h2>
                                    <p><strong>Method: </strong> PayPal</p>
                                    {/* PayPal Buttons */}
                                    {loadingPayPal ? (
                                        <p>Loading...</p> // Show loading state
                                    ) : (
                                        'AQQ5fKyqjEygOr9OJ3Mu7v7c0Mjs6-HkHyt1FYPNcOOsFP2zWKRp1pu_yQddwyvY2hyZC24a6h_lshHk' && (
                                            <>
                                                <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError} />
                                            </>
                                        )
                                    )}
                                </ListGroup.Item>

                                {/* Other Payment Options */}
                                {/* Cash on Delivery */}
                                <ListGroup.Item className="d-flex align-items-center mb-2">
                                    <input type="radio" name="paymentMethod" id="cashOnDelivery" className='mr-2' />
                                    Cash on Delivery
                                </ListGroup.Item>

                                {/* Mpesa */}
                                <ListGroup.Item className="d-flex align-items-center mb-2">
                                      <input type="radio" name="paymentMethod" id="cashOnDelivery" />
                                    <img src={mpesa} alt="Mpesa" width={24} height={24} className="me-2" />
                                  
                                    Mpesa
                                </ListGroup.Item>

                            </ListGroup>

                        </Card>
                    </Col>

                </Row>

              

            </div>

            {/* Footer */}
            <Footer />
        </PayPalScriptProvider>
    );
};
}

export default Payment;
