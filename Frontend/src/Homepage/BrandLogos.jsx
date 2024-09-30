import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './HomepageCSS/Brandlogos.css';
import toyotalogo from './Homepageimages/toyota.svg';
import mercedeslogo from './Homepageimages/mercedes.svg';
import subarulogo from './Homepageimages/subaru.svg';
import nissanlogo from './Homepageimages/Nissan.svg';
import hyundailogo from './Homepageimages/hyundai.svg';
import volvologo from './Homepageimages/volvo.svg'

const BrandLogos = () => {
  const brands = [
    { name: 'toyota', logo: toyotalogo },
    { name: 'mercedes', logo: mercedeslogo },
    { name: 'subaru', logo: subarulogo },
    { name: 'Nissan', logo: nissanlogo },
    { name: 'hyundai', logo: hyundailogo },
    { name: 'volvo', logo: volvologo },
  ];

  return (
    <Container className="text-center my-5">
      <Row>
        {brands.map((brand, index) => (
          <Col key={index} xs={6} md={2}>
            <img src={brand.logo} alt={brand.name} className="brand-logo" />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BrandLogos;
