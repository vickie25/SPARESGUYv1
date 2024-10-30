import React, { useState, useEffect } from 'react';
import { Row, Col, Nav } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Pages/PagesCSS/ProductDetail.css';
import Header from '../Homepage/Header.jsx';
import Footer from '../Homepage/Footer.jsx';
import Reviews from './Reviews.jsx';
import { useCart } from '../context/CartContext.jsx';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams(); // Get the product ID from URL
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Make sure your backend URL is correct
        const response = await axios.get(`http://localhost:8000/api/products/${id}/`);
        setProduct(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Product not found');
        // Optionally redirect to a 404 page or product listing
        // navigate('/shop');
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id, navigate]);

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
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
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item"><a href="/shop">Shop</a></li>
              <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
            </ol>
          </nav>

          <Row>
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
              <p className="price"><strong>Ksh{product.price}</strong></p>
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
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart({
                    _id: product._id, // Use product ID
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity // Pass the selected quantity
                  });
                }}
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
          {activeTab === 'description' && (
            <p className="text-muted">{product.description}</p>
          )}

          <div className="tab-content mt-3">
            {activeTab === 'description' && (
              <div className="tab-pane">
                <p>{product.description}</p>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="tab-pane active">
                <Reviews productId={product.id} />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;
