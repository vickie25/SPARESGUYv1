import React from 'react'
import "./PagesCSS/ContactUs.css"
import Footer from '../Homepage/Footer';
import Header from '../Homepage/Header';
import { BsTelephone } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import { BiMessageRounded } from "react-icons/bi";


const ContactUs = () => {
    return (
        <div>
            <Header />
            <main>
                <div className="head">
                    <h2>Contact Us</h2>
                    <p>Any question or remarks? Just write us a message!</p>
                </div>
                <div className="contacts">
                    <div className="g-i-t">
                        <h3>Get In Touch</h3>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="text" id="name" name="name" placeholder="Enter your name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" placeholder="Enter your email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Subject:</label>
                                <input type="text" id="subject" name="subject" placeholder="Enter the subject" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message:</label>
                                <textarea id="message" name="message" placeholder="Enter your message"></textarea>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                    <div className="location">
                        <div className="row">
                            <div className="phone">
                                <BsTelephone className="location-icon" />
                                <p>Phone Number</p>
                                <a href="tel:+2547894726890">+2547894726890</a>
                            </div>
                            <div className="email">
                                <MdOutlineMail className="location-icon" />
                                <p>Email Address</p>
                                <a href="mailto:apbcafrica@gmail.com">apbcafrica@gmail.com</a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="whatsapp">
                                <BiMessageRounded className="location-icon" />
                                <p>WhatsApp</p>
                                <a href="https://wa.me/2547894726890" target="_blank" rel="noopener noreferrer">+2547894726890</a>
                            </div>
                            <div className="office">
                                <MdOutlineLocationOn className="location-icon" />
                                <p>Office Location</p>
                                <a href="https://www.google.com/maps?sca_esv=b77251912650b4ae&output=search&q=blessed+house+ngara&source=lnms&fbs=AEQNm0Aa4sjWe7Rqy32pFwRj0UkWd8nbOJfsBGGB5IQQO6L3J3ppPdoHI1O-XvbXbpNjYYwWUVH6qTfR1Lpek5F-7GS5kHUv-XPg6sWhVG4k1EjbnJtLhBeL57sTXxXmiHxC27t3XXUxCvX_qlf7Bkns-G8lz6MIVRlNzq1Cqfjzvt-wjRfYPf8&entry=mc&ved=1t:200715&ictx=111" target="_blank" rel="noopener noreferrer">
                                    Blessed House, Ngara
                                </a>
                            </div>
                        </div>

                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.07630512314!2d36.8250014!3d-1.2769527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f16d44cd0a529%3A0x14921ace38876a25!2sBlessed%20House!5e0!3m2!1sen!2ske!4v1697041234567!5m2!1sen!2ske"
                                width="600"
                                height="450"
                                style={{ border: 0 }}
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
    )
}

export default ContactUs
