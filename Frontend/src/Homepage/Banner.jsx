// Banner.js

import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './HomepageCSS/Banner.css';
import airfilter from './Homepageimages/airfilters.svg';
import { Carousel } from 'flowbite-react';
import plugs from './Homepageimages/plugs.svg';
import { useNavigate } from 'react-router-dom';
import herosImage from './HomepageImages/heros.jpg';
import image1 from './HomepageImages/carousel.png'
import image2 from './HomepageImages/carousel2.png'
import image3 from './HomepageImages/carousel3.png'
import { Link } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();
  const [direction, setDirection] = useState('forward');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const images = [image1, image2, image3];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="banner" style={{ backgroundImage: `url(${herosImage})` }}>
      <div className="banner-content">
        <div className="welcome">
          <h1>Get The Quality At Your Doorstep</h1>
          <Link to="/shop"> <button className='shop-button' >Shop Now</button></Link>

        </div>
        <div className="carousel">
          <TransitionGroup>
            <CSSTransition
              key={currentImage}
              timeout={500}
              classNames={direction === 'forward' ? 'swipe' : 'swipe-reverse'}
            >
              <img src={images[currentImage]} alt={`Slide ${currentImage + 1}`} />
            </CSSTransition>
          </TransitionGroup>
          <div className="pagination-dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
