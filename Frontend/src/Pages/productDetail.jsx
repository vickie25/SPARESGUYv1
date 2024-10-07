import React from 'react';
import Header from '../Homepage/Header.jsx'
import Footer from '../Homepage/Footer.jsx';

import rearlights from '../Homepage/HomepageImages/rearlights.svg';
import {Row, Col, Container, Button} from 'react-bootstrap'

const ProductDetail = () => {
  const handleAddtoCart = () => {
    alert('Item added to cart'); 
    
  }
  
  return (
    <>
    <Header/>

    <Container>
      <Row>

        <Col>
        <img src="rearlights" alt="lights" />
        </Col>

        <Col>
        <h1><strong>Toyota</strong></h1>
        <p>Taillight car LED System</p>
        <p>Price: $100</p>
        <p>Enhance your driving visibility with our premium Car Headlight, designed for optimal performance and safety. This high-quality headlight offers bright, clear illumination, ensuring excellent road visibility even in low-light or harsh weather conditions</p>
        <Button style={{backgroundColor: '#00000'}}onClick={handleAddtoCart}> add to Cart</Button>
        
        </Col>
      </Row>
    </Container>
   
 

 
    <Footer/>
   </>
    
  );
};

export default ProductDetail;
