import React from 'react';
import './PagesCSS/AboutUs.css';
import car from '../assets/car.jpg'; // Corrected path
import overview from '../assets/overview.jpg';
import cat from '../assets/cat.webp'; // Add paths for team member images
import dog from '../assets/dog.webp';
import rabbit from '../assets/rabbit.webp';
import mouse from '../assets/mouse.webp';
import goat from '../assets/goat.webp';
import Footer from '../Homepage/Footer';
import Header from '../Homepage/Header';


const AboutUs = () => {
  return (
    <div>
        <Header/>
        <div className="Banner-About" style={{ backgroundImage: `url(${car})` }}>
            <h1>About Us At My Spares Guy</h1>
            <p>At My Spares Guy, we combine expertise and passion to deliver reliable, high-quality car parts. <br/>Our mission is to keep you on the road with trusted solutions and exceptional service.</p>
        </div>
        <div className="statistics-content">
            <div className="container">
                <div className="image-section">
                    <img src={overview} alt="Overview" />
                </div>
                <div className="text-section">
                    <p>My Spares Guy is a trusted provider of high-quality car spare parts, dedicated to helping customers keep their vehicles running smoothly and efficiently. With a deep understanding of the automotive industry, we specialize in offering a wide range of spare parts for all major car brands and models.</p>
                </div>
                <div className="stat-item"> 
                    <p><span className="black">3 </span><br /><span className="yellow">Years Market <br/> Lead</span></p><br></br>
            <p><span className="black">34K+</span> <br /> <span className="yellow">Product Delivery <br/>In The World</span></p><br></br>
            <p><span className="black">34K+ <br /></span> <span className="yellow">Satisfied <br/> Customers </span></p>
            </div>
               
            </div>
        </div>
        <div className="Team">
            <h2 className="teamh">Meet Our Team</h2>
            <div className="team-member">
                <img src={cat} alt="Member 1" />
                <p>John Doe - CEO</p>
            </div>
            <div className="team-member">
                <img src={dog} alt="Member 2" />
                <p>Jane Smith - CFO</p>
            </div>
            <div className="team-member">
                <img src={goat} alt="Member 3" />
                <p>Bob Johnson - COO</p>
            </div>
            <div className="team-member">
                <img src={mouse} alt="Member 4" />
                <p>Alice Brown - CTO</p>
            </div>
            <div className="team-member2">
                <img src={rabbit} alt="Member 5" />
                <p>Emily Davis - CMO</p>
            </div>
        </div>
        <div className="WhyUs">
            <h2>Why Shop With Us</h2>
            <div className="why-us-content">
                <p>Quality You Can Trust<br />We provide only the highest quality car parts from reputable brands, ensuring your vehicle gets the best.</p>
                <div className="vertical-line"></div>
                <p>Competitive Pricing<br />Get premium car parts at prices that won’t break the bank. We believe in offering value for every budget.</p>
                <div className="vertical-line"></div>
                <p>Fast and Reliable Shipping<br />We know you need your parts fast. That’s why we offer quick and reliable shipping to get your car back on the road as soon as possible.</p>
            </div>
        </div>
        <Footer/>
    </div>
  );
};

export default AboutUs;
