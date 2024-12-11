import React, { useState } from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import image1 from './HomepageImages/carousel.png';
import image2 from './HomepageImages/carousel2.png';
import image3 from './HomepageImages/carousel3.png';
import herosImage from './HomepageImages/heros.jpg';

const Banner = () => {
  const [index, setIndex] = useState(0);

  const bannerStyle = {
    position: 'relative',
    minHeight: '75vh', // Reduced height
    background: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${herosImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    paddingTop: '1rem', // Reduced top padding
    paddingBottom: '2rem',
    marginTop: '0', // Removed top margin
  };

  const welcomeTextStyle = {
    color: '#FFFFFF',
    fontFamily: '"Playfair Display", serif', // More elegant font
    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
    lineHeight: '1.3',
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontWeight: '600',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  };

  const subheadingStyle = {
    color: '#DAA520',
    fontFamily: '"Poppins", sans-serif',
    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
    textAlign: 'center',
    marginBottom: '2rem',
    fontWeight: '400',
    letterSpacing: '1px',
  };

  const shopButtonStyle = {
    backgroundColor: '#DAA520',
    border: 'none',
    padding: '12px 35px',
    fontSize: '1.1rem',
    transition: 'all 0.3s ease',
    color: '#000000',
    fontWeight: '600',
    fontFamily: '"Poppins", sans-serif',
    borderRadius: '30px',
    boxShadow: '0 4px 15px rgba(218, 165, 32, 0.3)',
  };

  const carouselImageStyle = {
    height: '380px',
    objectFit: 'contain',
    borderRadius: '15px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    padding: '10px',
  };

  const featuresStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginTop: '2rem',
    color: '#FFFFFF',
    fontFamily: '"Poppins", sans-serif',
  };

  const featureItemStyle = {
    textAlign: 'center',
    padding: '0.5rem',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={bannerStyle}
    >
      <Container>
        <Row className="align-items-center justify-content-between">
          <Col lg={5} md={6} className="mb-4 mb-md-0">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 style={welcomeTextStyle}>
                Get The Quality At Your Doorstep
              </h1>
              <p style={subheadingStyle}>
                Premium Auto Parts • Expert Service • Fast Delivery
              </p>
              <div className="text-center">
                <Link to="/shop">
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: '#B8860B' }}
                    whileTap={{ scale: 0.95 }}
                    className="btn"
                    style={shopButtonStyle}
                  >
                    Shop Now
                  </motion.button>
                </Link>
              </div>

              <div style={featuresStyle}>
                <motion.div
                  style={featureItemStyle}
                  whileHover={{ scale: 1.05 }}
                >
                  <i className="fas fa-truck" style={{ fontSize: '24px', color: '#DAA520' }}></i>
                  <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Free Shipping</p>
                </motion.div>
                <motion.div
                  style={featureItemStyle}
                  whileHover={{ scale: 1.05 }}
                >
                  <i className="fas fa-shield-alt" style={{ fontSize: '24px', color: '#DAA520' }}></i>
                  <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Warranty</p>
                </motion.div>
                <motion.div
                  style={featureItemStyle}
                  whileHover={{ scale: 1.05 }}
                >
                  <i className="fas fa-sync" style={{ fontSize: '24px', color: '#DAA520' }}></i>
                  <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Easy Returns</p>
                </motion.div>
              </div>
            </motion.div>
          </Col>

          <Col lg={6} md={6}>
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Carousel
                activeIndex={index}
                onSelect={(selectedIndex) => setIndex(selectedIndex)}
                interval={3000}
                indicators={true}
                fade
              >
                {[image1, image2, image3].map((image, idx) => (
                  <Carousel.Item key={idx}>
                    <motion.img
                      className="d-block w-100"
                      src={image}
                      alt={`Slide ${idx + 1}`}
                      style={carouselImageStyle}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default Banner;
