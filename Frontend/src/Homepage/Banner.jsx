import React from 'react';
import './HomepageCSS/Banner.css';
import airfilter from './Homepageimages/airfilters.svg'
import { Carousel } from 'flowbite-react'
import plugs from './Homepageimages/plugs.svg'
import { useNavigate } from 'react-router-dom';


const Banner = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login'); // Change this line
  }

  return (
    <div className="banner">
      <div className="banner-text">
        <h1>Get The Quality At Your Doorstep</h1>
        <button className="shop-now-btn" onClick={handleLoginRedirect}>Shop Now -&gt;</button>
      </div>
      <div className="banner-image">
        <Carousel slide={true} autoplay={true} interval={3000}>
          <img  className = "part1" src={plugs} alt="Spare Part 1" />
          <img src="https://example.com/image2.jpg" alt="Spare Part 2" />
          <img src="https://example.com/image3.jpg" alt="Spare Part 3" />
          {/* Add more images as needed */}
        </Carousel>
      </div>
    </div>
  );
};

export default Banner;