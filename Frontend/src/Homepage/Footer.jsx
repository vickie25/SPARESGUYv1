import React from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { 
  BsTelephone, 
  BsInstagram, 
  BsTwitter, 
  BsFacebook, 
  BsLinkedin,
  BsArrowUp 
} from "react-icons/bs";
import { FiMail, FiMapPin } from "react-icons/fi";
import { BiAccessibility } from "react-icons/bi";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { AiOutlineSafety } from "react-icons/ai";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container fluid style={{ backgroundColor: '#000000', color: '#FFFFFF', paddingTop: '3rem' }}>
      <Container>
        <Row className="gy-4">
          {/* Company Info */}
          <Col lg={3} md={6}>
            <h3 style={{ color: '#DAA520', marginBottom: '1.5rem' }}>MY SPARES GUY</h3>
            <div className="d-flex align-items-center mb-3">
              <FiMapPin className="me-2" style={{ color: '#DAA520' }} />
              <a 
                href="https://www.google.com/maps/place/Ngara,+Nairobi" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#FFFFFF', textDecoration: 'none' }}
                className="hover-gold"
              >
                11122-Ngara, Nairobi
              </a>
            </div>
            <div className="social-icons d-flex gap-3 mb-3">
              {[BsFacebook, BsTwitter, BsInstagram, BsLinkedin].map((Icon, index) => (
                <Icon 
                  key={index}
                  style={{ 
                    cursor: 'pointer', 
                    fontSize: '1.5rem',
                    color: '#DAA520',
                    transition: 'transform 0.3s ease'
                  }}
                  className="social-icon"
                />
              ))}
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={3} md={6}>
            <h3 style={{ color: '#DAA520', marginBottom: '1.5rem' }}>Quick Links</h3>
            {['Home', 'Products', 'About', 'Contact Us'].map((link, index) => (
              <div key={index} className="mb-2">
                <a 
                  href={`/${link.toLowerCase().replace(' ', '')}`}
                  style={{ 
                    color: '#FFFFFF', 
                    textDecoration: 'none',
                    display: 'block',
                    transition: 'color 0.3s ease'
                  }}
                  className="hover-gold"
                >
                  {link}
                </a>
              </div>
            ))}
          </Col>

          {/* Contact Info */}
          <Col lg={3} md={6}>
            <h3 style={{ color: '#DAA520', marginBottom: '1.5rem' }}>Contact Us</h3>
            <div className="mb-3">
              <a 
                href="tel:+2547123456" 
                style={{ color: '#FFFFFF', textDecoration: 'none' }}
                className="d-flex align-items-center hover-gold"
              >
                <BsTelephone className="me-2" style={{ color: '#DAA520' }} />
                +2547123456
              </a>
            </div>
            <div className="mb-3">
              <a 
                href="mailto:apbcafricait@gmail.com"
                style={{ color: '#FFFFFF', textDecoration: 'none' }}
                className="d-flex align-items-center hover-gold"
              >
                <FiMail className="me-2" style={{ color: '#DAA520' }} />
                apbcafricait@gmail.com
              </a>
            </div>
          </Col>

          {/* Newsletter */}
          <Col lg={3} md={6}>
            <h3 style={{ color: '#DAA520', marginBottom: '1.5rem' }}>Newsletter</h3>
            <p>Get $10 off your first order</p>
            <Form className="mt-3">
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Enter your email"
                  aria-label="Email address"
                  style={{ 
                    backgroundColor: 'transparent',
                    border: '1px solid #DAA520',
                    color: '#FFFFFF'
                  }}
                />
                <Button 
                  variant="outline-warning"
                  style={{ 
                    backgroundColor: '#DAA520',
                    border: 'none',
                    color: '#000000'
                  }}
                >
                  Subscribe
                </Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>

        <hr style={{ borderColor: '#DAA520', margin: '2rem 0' }} />

        {/* Footer Bottom */}
        <Row className="py-3 align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <small>&copy; {currentYear} My Spares Guy. All rights reserved.</small>
          </Col>
          <Col md={6}>
            <div className="d-flex justify-content-center justify-content-md-end gap-4">
              <small className="d-flex align-items-center">
                <MdOutlinePrivacyTip className="me-1" /> Privacy Policy
              </small>
              <small className="d-flex align-items-center">
                <AiOutlineSafety className="me-1" /> Terms
              </small>
              <small className="d-flex align-items-center">
                <BiAccessibility className="me-1" /> Accessibility
              </small>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Scroll to Top Button */}
      <Button
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#DAA520',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: '0.8',
          transition: 'opacity 0.3s ease'
        }}
        className="scroll-top-button"
      >
        <BsArrowUp />
      </Button>

      <style>
        {`
          .hover-gold:hover {
            color: #DAA520 !important;
          }
          
          .social-icon:hover {
            transform: translateY(-3px);
          }
          
          .scroll-top-button:hover {
            opacity: 1 !important;
          }
          
          @media (max-width: 768px) {
            .social-icons {
              justify-content: center;
            }
          }
        `}
      </style>
    </Container>
  );
};

export default Footer;