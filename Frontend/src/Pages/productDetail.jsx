import React, { useState } from 'react';
import { Row, Col, Button, Nav, Tab, Form } from 'react-bootstrap';
import axios from 'axios';

import ProductTabs from './ProductTabs';
import RelatedProducts from './RelatedProducts'; 

import Header from '../Homepage/Header.jsx';
import Footer from '../Homepage/Footer.jsx';
import { useCart } from '../context/CartContext'; // Import cart context
import './PagesCSS/productDetail.css'; // Import your CSS file

const ProductDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Handle quantity increment and decrement
  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      setQuantity((prev) => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const addToCart = () => {
    // Add to cart logic (e.g., API call)
    console.log('Product added to cart:', { product, quantity });
  };


  return (
    <div className="product-details container mt-4">
      {/* Breadcrumb */}
      <div className="breadcrumb mb-3">
        <a href="/">Home</a> / <a href="/products">Products</a> / {product.name}
      </div>

      {/* Product Section */}
      <Row>
        {/* Product Image */}
        <Col md={6}>
          <img
            src={`http://localhost:8000${product.image}`}
            alt={product.name}
            className="img-fluid rounded shadow"
          />
        </Col>

        <Col md={6}>
          <h2 className="product-title">{product.name}</h2>
          <p className="text-muted">{product.description}</p>
          <h4 className="product-price text-success">Ksh {product.price}</h4>
          <p className={product.inStock ? 'text-success' : 'text-danger'}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </p>

          <div className="quantity-controls my-3">
            <Button
              variant="outline-secondary"
              onClick={() => handleQuantityChange('decrement')}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <span className="mx-2">{quantity}</span>
            <Button
              variant="outline-secondary"
              onClick={() => handleQuantityChange('increment')}
            >
              +
            </Button>
          </div>

          <Button
            variant="primary"
            onClick={addToCart}
            disabled={!product.inStock}
          >
            Add to Cart
          </Button>
        </Col>
      </Row>

      {/* Tabs Section */}
      <div className="product-tabs mt-4">
        <Tab.Container activeKey={activeTab}>
          <Nav variant="tabs" onSelect={(tab) => setActiveTab(tab)}>
            <Nav.Item>
              <Nav.Link eventKey="description">Description</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="reviews">Reviews</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content className="mt-3">
            <Tab.Pane eventKey="description">
              <p>{product.fullDescription || 'No additional details available.'}</p>
            </Tab.Pane>
            <Tab.Pane eventKey="reviews">
              <Reviews productId={product._id} />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>

      {/* Related Products */}
      <RelatedProducts productId={product._id} />
    </div>

  if (error) {
    return (
      <>
        <Header />
        <div className="container mt-4">
          <div className="alert alert-danger">{error}</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="container mt-4">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <nav aria-label="breadcrumb" className="breadcrumb-nav">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Home</a></li>
          <li className="breadcrumb-item"><a href="/shop">Shop</a></li>
          <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
        </ol>
      </nav>
      <main>
        <div className="container mt-4">
          <div className="product-details-container">
            <Row className="product-details">
              <Col md={6}>
                <div className="product-image-container">
                  {product.image ? (
                    <img
                      src={`http://localhost:8000${product.image}`}
                      alt={product.name}
                      className="img-fluid"
                      style={{ maxHeight: '400px', width: 'auto' }}
                    />
                  ) : (
                    <div className="image-placeholder">Image not available</div>
                  )}
                </div>
              </Col>
              <Col md={6}>
                <h1>{product.name}</h1>
                <p className="text-muted">{product.description}</p>
                <p className="price"><strong>Ksh {product.price}</strong></p>
                <p>
                  <span className="badge bg-success">In Stock</span>
                </p>

                <div className="quantity-control d-flex align-items-center mb-3">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleQuantityChange(-1)}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="form-control w-25 text-center mx-2"
                    value={quantity}
                    readOnly
                  />
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleQuantityChange(1)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="btn btn-dark"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </Col>
            </Row>

            <Nav variant="tabs" activeKey={activeTab} className="mt-4">
              <Nav.Item>
                <Nav.Link
                  eventKey="description"
                  onClick={() => setActiveTab('description')}
                >
                  Description
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="reviews"
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <div className="tab-content mt-3">
              {activeTab === 'description' && (
                <div className="tab-pane active">
                  <p>{product.description}</p>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="tab-pane active">
                  <Reviews productId={product._id} />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetails;
