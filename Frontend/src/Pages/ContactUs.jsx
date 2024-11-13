import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { BsTelephone, BsWhatsapp } from "react-icons/bs";
import { MdOutlineMail, MdOutlineLocationOn } from "react-icons/md";
import Footer from '../Homepage/Footer';
import Header from '../Homepage/Header';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/contact/send-email', formData);
            alert('Message sent successfully!');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
            });
        } catch (error) {
            alert('Error sending message. Please try again.');
        }
    };

    const contactInfo = [
        {
            icon: <BsTelephone size={24} />,
            title: "Phone",
            content: "+2547894726890",
            link: "tel:+2547894726890"
        },
        {
            icon: <MdOutlineMail size={24} />,
            title: "Email",
            content: "apbcafrica@gmail.com",
            link: "mailto:apbcafrica@gmail.com"
        },
        {
            icon: <BsWhatsapp size={24} />,
            title: "WhatsApp",
            content: "+2547894726890",
            link: "https://wa.me/2547894726890"
        },
        {
            icon: <MdOutlineLocationOn size={24} />,
            title: "Location",
            content: "Blessed House, Ngara",
            link: "https://www.google.com/maps"
        }
    ];

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            
            <Container className="py-5">
                <Row className="text-center mb-5">
                    <Col>
                        <h2 style={{ color: '#DAA520', fontWeight: 'bold', marginBottom: '1rem' }}>
                            Contact Us
                        </h2>
                        <p style={{ color: '#000000' }}>
                            Have questions? We'd love to hear from you.
                        </p>
                    </Col>
                </Row>

                <Row className="g-4">
                    <Col lg={6}>
                        <Card style={{ 
                            backgroundColor: '#FFFFFF', 
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            border: 'none',
                            borderRadius: '15px',
                            padding: '2rem'
                        }}>
                            <Card.Body>
                                <h3 style={{ color: '#000000', marginBottom: '1.5rem' }}>Send us a Message</h3>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Subject</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Message</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Button 
                                        type="submit"
                                        style={{
                                            backgroundColor: '#DAA520',
                                            border: 'none',
                                            padding: '10px 30px',
                                            transition: 'all 0.3s ease'
                                        }}
                                        className="w-100"
                                    >
                                        Send Message
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={6}>
                        <Card style={{ 
                            backgroundColor: '#000000', 
                            color: '#FFFFFF',
                            height: '100%',
                            borderRadius: '15px',
                            border: 'none'
                        }}>
                            <Card.Body className="p-4">
                                <h3 className="mb-4">Contact Information</h3>
                                <Row xs={1} md={2} className="g-4 mb-4">
                                    {contactInfo.map((info, index) => (
                                        <Col key={index}>
                                            <div className="text-center mb-4">
                                                <div style={{ color: '#DAA520', marginBottom: '10px' }}>
                                                    {info.icon}
                                                </div>
                                                <h5 className="mb-2">{info.title}</h5>
                                                <a 
                                                    href={info.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ 
                                                        color: '#FFFFFF',
                                                        textDecoration: 'none',
                                                        transition: 'color 0.3s ease'
                                                    }}
                                                >
                                                    {info.content}
                                                </a>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                                <div className="mt-4" style={{ height: '300px' }}>
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.07630512314!2d36.8250014!3d-1.2769527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f16d44cd0a529%3A0x14921ace38876a25!2sBlessed%20House!5e0!3m2!1sen!2ske!4v1697041234567!5m2!1sen!2ske"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0, borderRadius: '10px' }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </div>
    );
};

export default ContactUs;