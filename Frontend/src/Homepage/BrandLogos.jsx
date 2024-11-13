import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import image1 from './HomepageImages/mercedes.svg';
import image2 from './HomepageImages/Nissan.svg';
import image3 from './HomepageImages/hyundai.svg';
import image4 from './HomepageImages/subaru.svg';
import image5 from './HomepageImages/toyota.svg';
import image6 from './HomepageImages/volvo.svg';

// Styled Components
const MainWrapper = styled.section`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 4rem 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(218, 165, 32, 0.05) 0%, transparent 70%);
  }
`;

const StyledContainer = styled(Container)`
  position: relative;
  z-index: 2;
`;

const LogoCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  padding: 1.8rem;
  border-radius: 15px;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.05),
    0 1px 2px rgba(218, 165, 32, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 140px;
  margin: 1rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #DAA520, #FFD700);
    transform: scaleX(0);
    transition: transform 0.4s ease;
    transform-origin: left;
  }

  &:hover::before {
    transform: scaleX(1);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 10px 30px rgba(0, 0, 0, 0.08),
      0 2px 4px rgba(218, 165, 32, 0.15);
  }

  img {
    max-width: 85%;
    max-height: 85%;
    object-fit: contain;
    filter: grayscale(100%);
    transition: all 0.5s ease;
    opacity: 0.8;
  }

  &:hover img {
    filter: grayscale(0%);
    opacity: 1;
    transform: scale(1.05);
  }
`;

const Title = styled.h2`
  color: #000000;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 600;
  font-size: 2.2rem;
  position: relative;
  padding-bottom: 20px;

  span {
    color: #DAA520;
    font-weight: 700;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #DAA520, #FFD700);
    border-radius: 2px;
  }
`;

const Subtitle = styled.p`
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const BrandLogos = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const images = [image1, image2, image3, image4, image5, image6];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <MainWrapper>
      <StyledContainer>
        <Title>
          Comprehensive <span>Auto Parts</span> Collection
        </Title>
        <Subtitle>
          Discover our extensive inventory of genuine parts and accessories for leading automotive brands. 
          Quality components for optimal performance and reliability.
        </Subtitle>
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <Row className="justify-content-center align-items-center">
            {images.map((image, index) => (
              <Col key={index} xs={6} sm={4} md={4} lg={2}>
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogoCard>
                    <motion.img
                      src={image}
                      alt={`Auto Brand ${index + 1}`}
                      className="img-fluid"
                      initial={{ rotate: -5 }}
                      whileHover={{ 
                        rotate: 0,
                        transition: { duration: 0.3 }
                      }}
                    />
                  </LogoCard>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </StyledContainer>
    </MainWrapper>
  );
};

export default BrandLogos;