
import React from 'react';
import overview from './AboutUsImages/overview.svg';
import './AboutUsCSS/Statistics.css';

const Statistics = () => {
  return (
    <div className="container">
      <footer className="footer">
      <p><span className="black-text">3</span> <br /> <span className="yellow-text">Years Market Lead</span></p>
        <p><span className="black-text">34K+</span> <br /> <span className="yellow-text">Product Deliveries In The World</span></p>
        <p><span className="black-text">34K+</span> <br /> <span className="yellow-text">Satisfied Customers</span></p>
      </footer>
      <div className="image-container">
        <img src={overview} alt="Overview" />
      </div>
      <div className="text-container">
        <div className="text">
          <p>
            My Spares Guy is a trusted provider of high-quality car spare parts, dedicated to helping customers keep their vehicles running smoothly and efficiently. With a deep understanding of the automotive industry, we specialize in offering a wide range of spare parts for all major car brands and models.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Statistics;