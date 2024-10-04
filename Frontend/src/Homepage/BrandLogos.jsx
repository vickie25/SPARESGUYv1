import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './HomepageCSS/Brandlogos.css';
import toyotalogo from './HomepageImages/toyota.svg';
import mercedeslogo from './HomepageImages/mercedes.svg';
import subarulogo from './HomepageImages/subaru.svg';
import nissanlogo from './HomepageImages/Nissan.svg';
import hyundailogo from './HomepageImages/hyundai.svg';
import volvologo from './HomepageImages/volvo.svg'

const BrandLogos = () => {
  // const brands = [
  //   { name: 'toyota', logo: toyotalogo },
  //   { name: 'mercedes', logo: mercedeslogo },
  //   { name: 'subaru', logo: subarulogo },
  //   { name: 'Nissan', logo: nissanlogo },
  //   { name: 'hyundai', logo: hyundailogo },
  //   { name: 'volvo', logo: volvologo },
  // ];

  return (
    <div className="brand-logos-container">
    <img src={toyotalogo} alt="Nissan" />
    <img src={mercedeslogo} alt="Subaru" />
    <img src={subarulogo} alt="Mercedes-Benz" />
    <img src={nissanlogo} alt="Hyundai" />
    <img src={hyundailogo} alt="Toyota" />
    <img src={volvologo} alt="Volvo" />
  </div>

  );
};

export default BrandLogos;
