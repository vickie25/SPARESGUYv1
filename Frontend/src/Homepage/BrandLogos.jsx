import React, { useState, useEffect } from 'react';
import './HomepageCSS/BrandLogos.css';
import image1 from './HomepageImages/mercedes.svg';
import image2 from './HomepageImages/Nissan.svg';
import image3 from './HomepageImages/hyundai.svg';
import image4 from './HomepageImages/subaru.svg';
import image5 from './HomepageImages/toyota.svg';
import image6 from './HomepageImages/volvo.svg';

const images = [image1, image2, image3, image4, image5, image6];

const BrandLogos = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 4; // Show 4 items at a time

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  // Get the visible images based on the currentIndex
  const getVisibleImages = () => {
    const visibleImages = [];
    for (let i = 0; i < itemsToShow; i++) {
      const index = (currentIndex + i) % images.length;
      visibleImages.push(images[index]);
    }
    return visibleImages;
  };

  return (
    <div className="brand-carousel-container">
      <div className="brand-carousel">
        {getVisibleImages().map((image, index) => (
          <div key={index} className="brand-carousel-item">
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandLogos;
