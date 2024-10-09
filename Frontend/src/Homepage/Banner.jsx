// Banner.js

import React from 'react';
import './HomepageCSS/Banner.css';
import airfilter from './Homepageimages/airfilters.svg';
import { Carousel } from 'flowbite-react';
import plugs from './Homepageimages/plugs.svg';
import { useNavigate } from 'react-router-dom';
import herosImage from './HomepageImages/heros.jpg';
import image1 from './HomepageImages/carousel.jpg'
import image2 from './HomepageImages/carousel.jpg';

const Banner = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login'); // Change this line
  }

  return (
    <div>
      <div className="banner" style={{ backgroundImage: `url(${herosImage})` }}>
        <div className="banner-content">
          <div className="welcome">
            <h1>Get The Quality At Your Doorstep</h1>
            <button>Shop Now</button>
          </div>
          <div className="carousel">
            <Carousel
              showThumbs={false}
              autoPlay={true}
              infiniteLoop={true}
              showStatus={false}
              interval={3000}
            >
              <div>
                <img src={image1} alt="Slide 1" />
              </div>
              <div>
                <img src={image2} alt="Slide 2" />
              </div>
            </Carousel>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Banner;
