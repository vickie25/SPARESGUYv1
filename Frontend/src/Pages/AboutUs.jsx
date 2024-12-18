import React, { useState } from 'react';
import './PagesCSS/AboutUs.css';
import car from '../assets/car.jpg'; 
import overview from '../assets/overview.jpg';
import one from '../assets/one.jpg'; 
import two from '../assets/two.jpg';
import three from '../assets/three.jpg';
import four from '../assets/four.jpg';
import five from '../assets/five.jpg';
import Footer from '../Homepage/Footer';
import Header from '../Homepage/Header';

const AboutUs = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const handleClick = (member) => {
    setSelectedMember(selectedMember === member ? null : member);
  };

  return (
    <div>
      <Header />
      <div className="Banner-About" style={{ backgroundImage: `url(${car})` }}>
        <h1>About Us At My Spares Guy</h1>
        <p>
          At My Spares Guy, we combine expertise and passion to deliver reliable, high-quality car parts. <br />
          Our mission is to keep you on the road with trusted solutions and exceptional service.
        </p>
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
            <p><span className="black">3 </span><br /><span className="yellow">Years Market <br /> Lead</span></p><br />
            <p><span className="black">34K+</span> <br /> <span className="yellow">Product Delivery <br />In The World</span></p><br />
            <p><span className="black">34K+ <br /></span> <span className="yellow">Satisfied <br /> Customers </span></p>
          </div>
        </div>
      </div>
      <div className="Team">
        <h2 className="teamh">Meet Our Team</h2>
        <div className="team-member" onClick={() => handleClick('David')}>
          <img src={one} alt="David Wainaina" />
          <p>David Wainaina - Project Manager</p>
          {selectedMember === 'David' && (
            <div className="member-details">
              <p>David has over 3 years of experience in project management and is a skilled Software Developer. He has successfully led multiple projects to completion, ensuring they met all deadlines and client expectations. David excels in team leadership, strategic planning, and problem-solving. He is proficient in various programming languages, including Python, Java, and JavaScript, and has a strong background in Agile methodologies. David's commitment to continuous learning and improvement makes him an invaluable asset to any team.</p>
            </div>
          )}
        </div>
        <div className="team-member" onClick={() => handleClick('Lynn')}>
          <img src={two} alt="Lynn Akinyi" />
          <p>Lynn Akinyi - Frontend Developer</p>
          {selectedMember === 'Lynn' && (
            <div className="member-details">
              <p>Lynn specializes in creating responsive and user-friendly interfaces. With over 4 years of experience in frontend development, she has a keen eye for design and user experience. Lynn is proficient in HTML, CSS, JavaScript, and modern frameworks like React and Vue.js. She has a strong understanding of accessibility standards and ensures that all web applications are inclusive and easy to use. Lynn's passion for web development drives her to stay updated with the latest trends and technologies.</p>
            </div>
          )}
        </div>
        <div className="team-member" onClick={() => handleClick('Nanjala')}>
          <img src={three} alt="Nanjala Yvone" />
          <p>Nanjala Yvone - Frontend Developer</p>
          {selectedMember === 'Nanjala' && (
            <div className="member-details">
              <p>Nanjala is skilled in React and has a keen eye for design. With over 3 years of experience in frontend development, she has contributed to several high-profile projects. Nanjala is proficient in JavaScript, React, and CSS, and has a strong background in graphic design, which allows her to create visually appealing and functional web applications. She is dedicated to producing high-quality code and continuously improving her skills through various online courses and workshops.</p>
            </div>
          )}
        </div>
        <div className="team-member" onClick={() => handleClick('Vinn')}>
          <img src={four} alt="Vinn Odhiambo" />
          <p>Vinn Odhiambo - Backend Developer</p>
          {selectedMember === 'Vinn' && (
            <div className="member-details">
              <p>Vinn has a strong background in server-side development with over 5 years of experience. He is an expert in Node.js, Express, and database management systems like MongoDB and PostgreSQL. Vinn has successfully developed and maintained several backend systems, ensuring their reliability and scalability. His deep understanding of server architecture and API design makes him a crucial member of the team. Vinn's analytical skills and attention to detail ensure that all backend operations run smoothly and efficiently.</p>
            </div>
          )}
        </div>
        <div className="team-member2" onClick={() => handleClick('Joe')}>
          <img src={five} alt="Joe Samuel" />
          <p>Joe Samuel - Backend Developer</p>
          {selectedMember === 'Joe' && (
            <div className="member-details">
              <p>Joe excels in database management and API development, with over 6 years of experience in backend development. He is proficient in SQL, Python, and various database technologies. Joe has a proven track record of designing and optimizing complex database systems to ensure data integrity and performance. His expertise in RESTful API development and integration has significantly contributed to the success of numerous projects. Joe's dedication to optimizing backend processes and improving system efficiency makes him a valuable asset to the team.</p>
            </div>
          )}
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
      <Footer />
    </div>
  );
};

export default AboutUs;
