import React, { useState, useEffect } from 'react';
import { Row, Col, Nav } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Homepage/Header.jsx';
import Footer from '../Homepage/Footer.jsx';
import Reviews from './Reviews.jsx';
import { useCart } from '../context/CartContext'; // Import cart context
import './PagesCSS/productDetail.css'; // Import your CSS file

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Use cart context

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        console.log(`Fetching product details for ID: ${id}`);
        const response = await axios.get(`http://localhost:8000/api/products/${id}`);
        console.log('Product details fetched:', response.data);
        setProduct(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching product details:', error.response ? error.response.data : error.message);
        setError('An error occurred while fetching product details.');
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }
  };

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
      <main>
        <div className="container mt-4">
          <nav aria-label="breadcrumb" className="breadcrumb-nav">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item"><a href="/shop">Shop</a></li>
              <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
            </ol>
          </nav>

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

export default ProductDetail;
