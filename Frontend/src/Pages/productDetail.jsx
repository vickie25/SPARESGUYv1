import React, { useState } from 'react';
import { Row, Col, Nav } from 'react-bootstrap';
import '../Pages/PagesCSS/ProductDetail.css';
import Header from '../Homepage/Header.jsx';
import rearlights from '../Homepage/HomepageImages/rearlights.svg';
import airfilter from '../Homepage/HomepageImages/airfilters.svg';
import plugs from '../Homepage/HomepageImages/plugs.svg';
import Footer from '../Homepage/Footer.jsx';
import Reviews from './Reviews.jsx';
import axios from 'axios';

const productDetail = () => {

  const relatedProducts = [
    { id: 1, name: 'airfilter', price: '$235.00', image: airfilter },
    { id: 2, name: 'plugs', price: '$235.00', image: plugs },
    { id: 3, name: 'airfilter', price: '$235.00', image: airfilter },
    { id: 4, name: 'plugs', price: '$235.00', image: plugs },
  ];

  // State for tabs
  const [activeTab, setActiveTab] = useState('description');

  return (
    <>
      <Header />
      <div className="container mt-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item"><a href="/shop">Shop</a></li>
            <li className="breadcrumb-item active" aria-current="page">Toyota Headlights</li>
          </ol>
        </nav>

        <Row>
          <Col md={2}>
            <img
              src={rearlights}
              alt="Toyota Taillight"
              className="img-fluid"
              style={{ maxHeight: '250px', width: 'auto' }}
            />
          </Col>
          <Col>
            <h1>TOYOTA</h1>
            <p>Taillight car LED system</p>
            <p><strong>$235.00</strong></p>
            <p><span className="badge bg-success">In Stock</span></p>
            <div className="rating">
              ★★★★★ <span>(12 Reviews)</span>
            </div>
            <p>Enhance your driving visibility with our premium Car Headlight, designed for optimal
              performance and safety. This high-quality headlight offers bright, clear illumination, ensuring excellent road
              visibility even in low-light or harsh weather conditions.</p>

            <div className="quantity-control d-flex align-items-center mb-3">
              <button className="btn btn-outline-secondary">-</button>
              <input type="text" className="form-control w-25 text-center mx-2" value="1" readOnly />
              <button className="btn btn-outline-secondary">+</button>
            </div>
            <button className="btn btn-dark">Add to cart</button>
          </Col>
        </Row>
        <Nav variant="tabs" activeKey={activeTab} className="mt-4">
          <Nav.Item>
            <Nav.Link eventKey="description" onClick={() => setActiveTab('description')}>
              Description
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="additional-info" onClick={() => setActiveTab('additional-info')}>
              Additional Information
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="reviews" onClick={() => setActiveTab('reviews')}>
              Reviews
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {/* Tab Content */}
        <div className="tab-content mt-3">
          {activeTab === 'description' && (
            <div className="tab-pane">
              <p>
                Enhance your driving visibility with our premium Car Headlight, designed for optimal performance and safety. This high-quality headlight offers bright, clear illumination, ensuring excellent road visibility even in low-light or harsh weather conditions.
              </p>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="tab-pane active">
              <Reviews />
            </div>
          )}
        </div>
        <h3 className="mt-5">Related Products</h3>
        <Row className="mt-3">
          {relatedProducts.map((product) => (
            <Col md={3} key={product.id} style={{ justifyContent: 'space-between', alignContent: 'flex-end' }}>
              <div className="product-card text-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="img-fluid mb-2"
                  style={{ height: '150px', objectFit: 'cover', marginBottom: '4px' }}
                />
                <p>{product.name}</p>
                <p><strong>{product.price}</strong></p>
              </div>
            </Col>
          ))}
        </Row>

        <Footer />
      </div>
    </>
  );
};

export default productDetail;
