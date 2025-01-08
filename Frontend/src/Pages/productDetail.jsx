import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Nav, Tab } from 'react-bootstrap';
import Reviews from './Reviews';
import RelatedProducts from './RelatedProducts';
import ProductTabs from './ProductTabs';
import Header from '../Homepage/Header';
import Footer from '../Homepage/Footer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const ProductDetails = ({ error }) => {
  const { id } = useParams();
  const [product, setProduct]=useState(null);
  const response =async()=>{
    const res = await axios.get(`/api/products/${id}`);
   setProduct(res.data);
   console.log(res, "product details");
  } 

  useEffect(() => {
    response()
  },[id])
  console.log(id),"product id needed";
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [productDescription, setProductDescription] = useState('');

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

  if (!product) {
    return (
      <>
        <Header />
        <div className="container mt-4">
          <div className="alert alert-danger">
            {error || 'Product not found'}
          </div>
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
                      src={product.image}
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
                    onClick={() => handleQuantityChange('decrement')}
                    disabled={quantity <= 1}
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
                    onClick={() => handleQuantityChange('increment')}
                  >
                    +
                  </button>
                </div>

                <button
                  className="btn btn-dark"
                  onClick={addToCart}
                  disabled={!product.inStock}
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
                  <p>{product.fullDescription || 'No additional details available.'}</p>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="tab-pane active">
                  <Reviews productId={product._id} />
                </div>
              )}
            </div>
          </div>

          <div className="related-products mt-5">
            <h3>Related Products</h3>
            <RelatedProducts productId={product._id} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetails;