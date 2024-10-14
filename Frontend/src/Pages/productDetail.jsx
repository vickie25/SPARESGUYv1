import React, { useState, useEffect } from 'react';
import Header from '../Homepage/Header';
import Footer from '../Homepage/Footer'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import rearlights from '../Homepage/HomepageImages/rearlights.svg'

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState({
    productName: '',
    price: '',
    description: '',
    quantity: 1,
  });
useEffect(() => {
    const savedDetails = localStorage.getItem('productDetails');
    if (savedDetails) {
      setProductDetails(JSON.parse(savedDetails));
    }
  }, []);
useEffect(() => {
    localStorage.setItem('productDetails', JSON.stringify(productDetails));
  }, [productDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
return (
    <>
    <Header/>
    <Container style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <div>
 <Row>
      <Col xs={6} md={4}>
          <img src={rearlights} alt='rectangle' />
        </Col>
      <Col xs={6} md={4}>
          <p>hello, how are you doing this afternoon?</p>
          <p>this week , we shall handle our e-commerce website, mysparesguy </p>
        </Col>
  </Row>
      <h2>Product Details</h2>
      <label>Product Name:</label>
        <input
          type="text"
          name="productName"
          value={productDetails.productName}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
    <label>Price:</label>
        <input
          type="number"
          name="price"
          value={productDetails.price}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
     </div>
      
      <div style={{ marginBottom: '10px' }}>
        <label>Description:</label>
        <textarea
          name="description"
          value={productDetails.description}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <label>Quantity:</label>
        <input
          type="number"
          name="quantity"
          value={productDetails.quantity}
          onChange={handleInputChange}
          min="1"
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
      </div>

      <button
        onClick={() => alert('Product added to cart')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '4px',
        }}
      >
        Add to Cart
      </button>
    </Container>
    <Footer/>
    </>
  );
};

export default ProductDetails;
