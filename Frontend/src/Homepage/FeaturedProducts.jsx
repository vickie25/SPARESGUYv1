import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const [discountedItems, setDiscountedItems] = useState([]);
  const [timeLeft, setTimeLeft] = useState('');
  const [showMore, setShowMore] = useState(false);

  // Styles object
  const styles = {
    container: {
      minHeight: '90vh',
      backgroundColor: '#FFFFFF',
      padding: '2rem 0'
    },
    heading: {
      color: '#000000',
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      marginBottom: '1rem'
    },
    timer: {
      color: '#DAA520',
      fontSize: '2.5rem',
      fontWeight: 'bold',
      margin: '1rem 0'
    },
    card: {
      border: 'none',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease',
      height: '100%',
      backgroundColor: '#FFFFFF'
    },
    cardImage: {
      height: '300px',
      objectFit: 'cover'
    },
    discountBadge: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: '#DAA520',
      padding: '0.5rem 1rem',
      borderRadius: '25px'
    },
    price: {
      color: '#DAA520',
      fontSize: '1.25rem',
      fontWeight: 'bold'
    },
    originalPrice: {
      textDecoration: 'line-through',
      color: '#6c757d',
      marginRight: '1rem'
    },
    button: {
      backgroundColor: '#DAA520',
      border: 'none',
      padding: '0.75rem 1.5rem',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: '#B8860B',
        transform: 'translateY(-2px)'
      }
    }
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/products')
      .then(response => {
        const products = response.data;
        const itemsWithDiscount = products.filter(product => product.hasDiscount);
        setDiscountedItems(itemsWithDiscount);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const endDate = new Date('2024-12-31T23:59:59');
      const timeDifference = endDate - now;

      if (timeDifference <= 0) {
        clearInterval(interval);
        setTimeLeft('Discount period has ended');
      } else {
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDifference / 1000) % 60);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container fluid style={styles.container}>
      <Row className="justify-content-center align-items-center">
        <Col md={6} className="text-center mb-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 style={styles.heading}>Exclusive Offers</h1>
            <Alert variant="warning" className="d-inline-block">
              <h3 className="mb-0">Time Remaining</h3>
              <div style={styles.timer}>{timeLeft}</div>
            </Alert>
          </motion.div>
        </Col>
      </Row>

      <Row>
        {discountedItems.slice(0, showMore ? undefined : 2).map((item, index) => {
          const discountedPrice = item.price - (item.price * (item.discountPercentage / 100));
          
          return (
            <Col key={item._id} lg={6} className="mb-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card style={styles.card} className="h-100">
                  <Badge style={styles.discountBadge}>
                    {item.discountPercentage}% OFF
                  </Badge>
                  <Card.Img
                    variant="top"
                    src={`http://localhost:8000${item.image}`}
                    style={styles.cardImage}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="h4 mb-3">{item.name}</Card.Title>
                    <div className="mt-auto">
                      <div className="d-flex align-items-center mb-3">
                        <span style={styles.originalPrice}>
                          Ksh {item.price.toFixed(2)}
                        </span>
                        <span style={styles.price}>
                          Ksh {discountedPrice.toFixed(2)}
                        </span>
                      </div>
                      <Button
                        style={styles.button}
                        onClick={() => addToCart({ ...item, price: discountedPrice, quantity: 1 })}
                        className="w-100"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          );
        })}
      </Row>

      <Row className="justify-content-center mt-4">
        <Col xs="auto">
          <Button
            variant="outline-warning"
            onClick={() => setShowMore(!showMore)}
            style={{ borderColor: '#DAA520', color: '#DAA520' }}
          >
            {showMore ? 'Show Less' : 'Explore More'}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default FeaturedProducts;