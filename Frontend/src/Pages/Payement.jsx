import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Homepage/Header';
import Footer from '../Homepage/Footer';
import mpesa from '../Homepage/HomepageImages/mpesa.svg';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useGetPaypalClientIdQuery } from "../slices/transactionApiSlice";
import { useGetOrderByIdQuery, useUpdateOrderMutation } from '../slices/OrderApiSlice';
import { toast } from 'react-toastify';

const Payment = () => {
    const { orderId } = useParams();
    console.log(orderId);
    const navigate = useNavigate();
    const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPaypalClientIdQuery();
    const { data: order, isLoading: loadingOrder, error: errorOrder } = useGetOrderByIdQuery(orderId);
    console.log(order, "order")
    const [updateOrder] = useUpdateOrderMutation();
    const [validated, setValidated] = useState(false);
    const [shippingAddress, setShippingAddress] = useState({ location: '', residence: '' });
    const [paymentMethod, setPaymentMethod] = useState('');
    const clientId = 'AQQ5fKyqjEygOr9OJ3Mu7v7c0Mjs6-HkHyt1FYPNcOOsFP2zWKRp1pu_yQddwyvY2hyZC24a6h_lshHk';

    useEffect(() => {
        if (order) {
            setShippingAddress(order.shippingAddress);
            setPaymentMethod(order.paymentMethod);
        }
    }, [order]);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            if (!paymentMethod) {
                toast.error("Please select a payment method");
                return;
            }

            const updatedOrderData = {
                ...order,
                shippingAddress,
                paymentMethod,
                isPaid: paymentMethod === 'PayPal',
                datePaid: paymentMethod === 'PayPal' ? new Date() : null,
                orderStatus: paymentMethod === 'PayPal' ? 'Completed' : 'Pending',
                transactionId: paymentMethod === 'PayPal' ? `PayPal-${new mongoose.Types.ObjectId()}` : null
            };

            try {
                await updateOrder({ id: orderId, ...updatedOrderData }).unwrap();
                if (paymentMethod === 'Cash on Delivery') {

                    navigate('/success');
                } else if (paymentMethod === 'PayPal') {
                    onApprove();
                }
            } catch (error) {
                console.error('Error updating order:', error);
                toast.error('An error occurred while updating the order.');
            }
        }
        setValidated(true);
    };

    const createOrderPayPal = (data, actions) => {
        return actions.order.create({
            purchase_units: [{
                amount: { value: order.totalAmount.toString() } // Ensure value is a string
            }]
        });
    };

    const onApprove =async () => {
        // await updateOrder({ id: orderId, ...updatedOrderData }).unwrap();
        navigate('/success', { state: { orderId, isPaid: true, datePaid: new Date(), paymentMethod: 'PayPal' } }); // Navigate to success page
    };

    const onError = (error) => {
        toast.error("Payment Failed");
        console.log(error);
        navigate('/payment');
    };

    if (loadingOrder) {
        return <p>Loading...</p>; // Show loading state while fetching the order
    }

    if (errorOrder) {
        toast.error("Failed to fetch order details");
        return <p>Error loading order</p>; // Fallback UI
    }

    if (errorPayPal) {
        toast.error("Failed to load PayPal client ID");
        return <p>Error loading PayPal</p>; // Fallback UI
    }

    return (
        <PayPalScriptProvider options={{ 'client-id': clientId, currency: 'USD' }}>
            <Header />
            <h2>Order# {orderId}</h2>
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
                                            <Form.Control required type="text" placeholder="Enter Your Name" defaultValue={order.customerId.name} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="formEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control required type="email" placeholder="Enter your email address" defaultValue={order.customerId.email} />
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
                                            <Form.Control as="select" required onChange={(e) => setShippingAddress({ ...shippingAddress, location: e.target.value })} >
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
                                    <Form.Control type="text" placeholder="Enter building name" onChange={(e) => setShippingAddress({ ...shippingAddress, residence: e.target.value })} />
                                </Form.Group>

                                <Button type="submit" className="mt-3">Proceed to Payment</Button>
                            </Form>
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
                                        clientId && (
                                            <PayPalButtons createOrder={createOrderPayPal} onApprove={(data, actions) => {
                                                return actions.order.capture().then(details => {
                                                    onApprove();
                                                });
                                            }} onError={onError} />
                                        )
                                    )}
                                </ListGroup.Item>

                                {/* Cash on Delivery */}
                                <ListGroup.Item className="d-flex align-items-center mb-2">
                                    <input type="radio" name="paymentMethod" id="cashOnDelivery" className='mr-2' value="Cash on Delivery" onChange={(e) => setPaymentMethod(e.target.value)} />
                                    Cash on Delivery
                                </ListGroup.Item>

                                {/* Mpesa */}
                                <ListGroup.Item className="d-flex align-items-center mb-2">
                                    <input type="radio" name="paymentMethod" id="mpesa" disabled />
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

export default Payment;
