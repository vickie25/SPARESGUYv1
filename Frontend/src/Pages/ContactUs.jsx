import React from 'react'
import "./PagesCSS/ContactUs.css"
import { BsTelephone } from "react-icons/bs";
import { MdOutlineMail, MdOutlineLocationOn } from "react-icons/md";
import { BiMessageRounded } from "react-icons/bi";
import Footer from '../Homepage/Footer';
import Header from '../Homepage/Header';


const ContactUs = () => {
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
                        <form>
                            <div className="form-group">
                                <label>Name:</label>
                                <input type="text" placeholder="Enter your name" />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" placeholder="Enter your email" />
                            </div>
                            <div className="form-group">
                                <label>Subject:</label>
                                <input type="text" placeholder="Enter the subject" />
                            </div>
                            <div className="form-group">
                                <label>Message:</label>
                                <textarea placeholder="Enter your message"></textarea>
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
