import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import Header from '../Homepage/Header';
import Footer from '../Homepage/Footer';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';

// Animations
const wheelSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const engineSmoke = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
`;

// Truck Components
const TruckContainer = styled.div`
  position: relative;
  width: 400px;
  height: 200px;
  margin: 50px auto;
`;

const Cabin = styled.div`
  position: absolute;
  bottom: 40px;
  left: 0;
  width: 120px;
  height: 100px;
  background: linear-gradient(135deg, #ff6b00, #ff8533);
  border-radius: 20px 0 0 0;
  box-shadow: 
    inset -5px -5px 15px rgba(0,0,0,0.3),
    inset 5px 5px 15px rgba(255,255,255,0.2);

  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: 0;
    width: 120px;
    height: 20px;
    background: #ff8533;
    border-radius: 5px 5px 0 0;
  }
`;

const WindShield = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 60px;
  height: 50px;
  background: linear-gradient(135deg, #a8d8ff, #fff);
  border-radius: 5px;
  transform: skew(-10deg);
  border: 3px solid #333;
`;

const Cargo = styled.div`
  position: absolute;
  bottom: 40px;
  left: 120px;
  width: 280px;
  height: 120px;
  background: linear-gradient(to bottom, #e64d00, #ff6b00);
  border-radius: 0 10px 0 0;
  box-shadow: 
    inset -5px -5px 15px rgba(0,0,0,0.3),
    inset 5px 5px 15px rgba(255,255,255,0.2);
`;

const Wheel = styled.div`
  position: absolute;
  bottom: 0;
  width: 50px;
  height: 50px;
  background: #333;
  border-radius: 50%;
  border: 5px solid #666;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 25px;
    height: 25px;
    background: #999;
    border-radius: 50%;
    animation: ${wheelSpin} 2s linear infinite;
  }

  &.front {
    left: 30px;
  }

  &.back1 {
    right: 90px;
  }

  &.back2 {
    right: 30px;
  }
`;

const Headlight = styled.div`
  position: absolute;
  bottom: 70px;
  left: 0;
  width: 15px;
  height: 15px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 10px #fff;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
    width: 30px;
    height: 10px;
    background: linear-gradient(to right, rgba(255,255,255,0.8), transparent);
  }
`;

const Grille = styled.div`
  position: absolute;
  bottom: 50px;
  left: 10px;
  width: 30px;
  height: 20px;
  background: #333;
  border-radius: 5px;
  
  &::before {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: 20px;
    height: 2px;
    background: #666;
    box-shadow: 0 4px 0 #666, 0 8px 0 #666;
  }
`;

const ExhaustPipe = styled.div`
  position: absolute;
  bottom: 30px;
  left: 0;
  width: 20px;
  height: 10px;
  background: #666;

  &::after {
    content: '';
    position: absolute;
    left: -5px;
    top: -5px;
    width: 10px;
    height: 10px;
    background: rgba(100,100,100,0.5);
    border-radius: 50%;
    animation: ${engineSmoke} 2s infinite;
  }
`;

const SideWindow = styled.div`
  position: absolute;
  top: 30px;
  left: 80px;
  width: 30px;
  height: 30px;
  background: linear-gradient(135deg, #a8d8ff, #fff);
  border-radius: 5px;
  border: 2px solid #333;
`;

const DoorHandle = styled.div`
  position: absolute;
  top: 50px;
  left: 70px;
  width: 15px;
  height: 5px;
  background: #333;
  border-radius: 2px;
`;



const Success = () => {
    const location = useLocation();
    const { orderId, isPaid, datePaid, paymentMethod, totalAmount, cartItems } = location.state;

    return (
        <>
            <Header />
            <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '70vh', backgroundColor: '#f9f9f9' }}>
                <Row className="w-100 text-center">
                    <Col>
                        <div className="my-4">
                            <FaCheckCircle size={80} color="green" />
                        </div>
                        <h1 className="text-success mb-4">Order Placed Successfully!</h1>
                        <p>Your order (ID: {orderId}) has been placed successfully and is ready to be delivered.</p>
                        <p><strong>Payment Method:</strong> {paymentMethod}</p>
                        {isPaid && (
                            <p><strong>Paid On:</strong> {new Date(datePaid).toLocaleString()}</p>
                        )}
                        <p>Thank you for shopping with us! Your order will be delivered to you shortly.</p>
                        
                        <TruckContainer>
    <Cabin>
      <WindShield />
      <SideWindow />
      <DoorHandle />
      <Headlight />
      <Grille />
      <ExhaustPipe />
    </Cabin>
    <Cargo />
    <Wheel className="front" />
    <Wheel className="back1" />
    <Wheel className="back2" />
  </TruckContainer>

                        <p className="mt-3"><strong>Delivery Initiated!</strong></p>
                        
                        <Button 
                            variant="primary" 
                            size="lg"
                            style={{ marginTop: '20px' }}
                        >
                            Track Delivery
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default Success;