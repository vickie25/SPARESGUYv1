import React, { useState } from 'react';
import axios from 'axios';
import "./PagesCSS/ContactUs.css";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineMail, MdOutlineLocationOn } from "react-icons/md";
import { BiMessageRounded } from "react-icons/bi";
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
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/contact/send-email', formData);
            console.log('Email sent successfully:', response.data);
            alert('Your message has been sent successfully!');

            // Clear the form fields
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
            });
        } catch (error) {
            console.error('Error sending email:', error);
            alert('There was an error sending your message. Please try again later.');
        }
    };

    return (
        <div className="page-container">
            <main className="main-content">
                <div className="header">
                    <h2>Contact Us</h2>
                    <p>Any question or remarks? Just write us a message!</p>
                </div>

                <div className="contact-container">
                    {/* Get in Touch Form */}
                    <div className="form-section">
                        <h3>Get In Touch</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name:</label>
                                <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Subject:</label>
                                <input type="text" name="subject" placeholder="Enter the subject" value={formData.subject} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Message:</label>
                                <textarea name="message" placeholder="Enter your message" value={formData.message} onChange={handleChange}></textarea>
                            </div>
                            <button type="submit" className="submit-button">Submit</button>
                        </form>
                    </div>

                    {/* Location and Contact Info */}
                    <div className="info-section">
                        <div className="contact-grid">
                            {/* Phone */}
                            <div className="contact-item">
                                <BsTelephone className="contact-icon" />
                                <p className="label">Phone Number</p>
                                <a href="tel:+2547894726890">+2547894726890</a>
                            </div>
                            {/* Email */}
                            <div className="contact-item">
                                <MdOutlineMail className="contact-icon" />
                                <p className="label">Email Address</p>
                                <a href="mailto:apbcafrica@gmail.com">apbcafrica@gmail.com</a>
                            </div>
                            {/* WhatsApp */}
                            <div className="contact-item">
                                <BiMessageRounded className="contact-icon" />
                                <p className="label">WhatsApp</p>
                                <a href="https://wa.me/2547894726890" target="_blank" rel="noopener noreferrer">
                                    +2547894726890
                                </a>
                            </div>
                            {/* Office */}
                            <div className="contact-item">
                                <MdOutlineLocationOn className="contact-icon" />
                                <p className="label">Office Location</p>
                                <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">
                                    Blessed House, Ngara
                                </a>
                            </div>
                        </div>

                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.07630512314!2d36.8250014!3d-1.2769527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f16d44cd0a529%3A0x14921ace38876a25!2sBlessed%20House!5e0!3m2!1sen!2ske!4v1697041234567!5m2!1sen!2ske"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ContactUs;
