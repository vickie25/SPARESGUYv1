import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Nav, Tab } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import RelatedProducts from './relatedProducts';

// import RelatedProducts from './RelatedProducts';

import Header from '../Homepage/Header.jsx';
import Footer from '../Homepage/Footer.jsx';
import Reviews from './Reviews';
import Description from './description';

const ProductDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('description');
  const handleTabSelect = (key) => setActiveTab(key);

  const [cartCount, setCartCount] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    return savedCart ? savedCart.reduce((acc, item) => acc + item.quantity, 0) : 0;
  });

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // const [cartCount, setCartCount] = useState(0);

  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    fetch(`/api/products/${id}/reviews`)
      .then((res) => res.json())
      .then((data) => Reviews(data))
      .catch((err) => console.error('Error fetching reviews:', err));
  }, [id]);

  const handleQuantityChange = (action) => {
    if (action === 'increment') setQuantity(quantity + 1);
    else if (action === 'decrement' && quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    const cartItem = { ...product, quantity };
    setCartCount(cartCount + quantity);
    setCart((prevCart) => {
      const updatedCart = [...prevCart, cartItem];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });

    fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartItem),
    })
      .then((response) => response.json())
      .then(() => setIsAdded(true))
      .catch((error) => {
        console.error('Error:', error);
        setIsAdded(false);
      });
  };

  if (error) {
    return (
      <>
        <Header cartCount={cartCount} />
        <div className="container mt-4">
          <div className="alert alert-danger">{error}</div>
        </div>
        <Footer />
      </>
    );
  }

  if (loading || !product) {
    return (
      <>
        <Header cartCount={cartCount} />
        <div className="container mt-4 text-center">Loading...</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header cartCount={cartCount} />
      <div className="container mt-4">
        <Row>
          {/* Left Column */}
          <Col md={6}>
            <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
              <ol className="breadcrumb" style={{ fontSize: '0.9rem' }}>
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item"><a href="/products">Shop</a></li>
                <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
              </ol>
            </nav>
            {product.image ? (
              <img
                src={`http://localhost:8000${product.image}`}
                alt={product.name}
                className="img-fluid rounded shadow mb-2"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <div className="image-placeholder">Image not available</div>
            )}
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.5rem' }}>
              {product.name}
            </h1>
          </Col>

          {/* Right Column */}
          
          <Col md={6}>
            <h4 className="product-title">{product.name}</h4>
            <p className="text-muted">{product.description}</p>
            <h4 className="product-price text-success">Ksh {product.price}</h4>
            <p className={product.inStock ? 'text-success' : 'text-danger'}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </p>
            <div className="quantity-controls my-3 d-flex align-items-center">
              <Button
                variant="outline-secondary"
                onClick={() => handleQuantityChange('decrement')}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="mx-2">{quantity}</span>
              <Button variant="outline-secondary" onClick={() => handleQuantityChange('increment')}>
                +
              </Button>
            </div>
            <Button onClick={handleAddToCart} disabled={isAdded} className="mt-2">
              {isAdded ? 'Added to Cart' : 'Add to Cart'}
            </Button>
            <div className="product-tabs mt-4">
              <Tab.Container activeKey={activeTab}>
                <Nav variant="tabs" activeKey={activeTab} onSelect={handleTabSelect}>
                  <Nav.Item>
                    <Nav.Link eventKey="description">Description</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="reviews">Reviews</Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content className="mt-3">
                  {activeTab === 'description' ? <Description /> : <Reviews />}
                </Tab.Content>
              </Tab.Container>
            </div>
          </Col>
        </Row>
        {/* <RelatedProducts /> */}
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
