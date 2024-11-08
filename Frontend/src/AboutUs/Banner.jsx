import React from 'react';
import './AboutUsCSS/Banner.css';
import bg from './AboutUsImages/bg.jpg';

const Banner = () => {
  return (
    <div className="aboutBanner">
      <main
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh', // Full height for the main element
          filter: 'blur(8px)', // Apply blur effect
          position: 'relative', // Position relative for stacking
          zIndex: 0, // Background layer

        }}
      >
      </main>
      <div className="bannerContent">
        <div className="about-welcome">
          <h1 className="h">About Us At My Spares Guy</h1>
          <p className="p">
            At My Spares Guy, we combine expertise and passion to deliver reliable, high-quality car parts. Our mission is to keep you on the road with trusted solutions and exceptional service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
