import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Nav, Tab } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import RelatedProducts from './RelatedProducts';
import Header from '../Homepage/Header.jsx';
import Footer from '../Homepage/Footer.jsx';
import Reviews from './Reviews';
import Description from './description';
import './PagesCSS/productDetail.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('description');
  const handleTabSelect = (key) => {
    setActiveTab(key);
  };

  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    return savedCart || [];
  });

  // const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [isAdded, setIsAdded] = useState(false);  // Track if product is added to cart

  useEffect(() => {
    console.log('Fetching product with ID:', id);
    setLoading(true);
    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
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

    // Fetch reviews
    fetch(`/api/products/${id}/reviews`)
      .then((res) => res.json())
      .then((data) => Reviews(data))
      .catch((err) => console.error('Error fetching reviews:', err));
  }, [id]);

  const handleQuantityChange = (action) => {
    if (action === 'increment') {
      setQuantity(quantity + 1);
    } else if (action === 'decrement' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    const cartItem = { ...product, quantity };
    setCartCount(cartCount + quantity);

    // Update localStorage to persist cart state
    setCart((prevCart) => {
      const updatedCart = [...prevCart, cartItem];
      localStorage.setItem('cart', JSON.stringify(updatedCart));  // Store updated cart in localStorage
      return updatedCart;
    });

    // Option: Send to backend
    fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartItem),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Product added to cart:', data);
        setIsAdded(true); // Set isAdded to true once the product is added
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsAdded(false); // Reset isAdded if there's an error
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
        <div className="container mt-4">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header cartCount={cartCount} />
      <div className="container mt-4">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="breadcrumb-nav">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item"><a href="/products">shop</a></li>
            <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
          </ol>
        </nav>

        {/* Product Section */}
        <Row>
          {/* Product Image */}
          <Col md={6}>
            {product.image ? (
              <img
                src={`http://localhost:8000${product.image}`}
                alt={product.name}
                className="img-fluid rounded shadow"
              />
            ) : (
              <div className="image-placeholder">Image not available</div>
            )}
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
            <Button onClick={handleAddToCart} disabled={isAdded}>
              {isAdded ? 'Added to Cart' : 'Add to Cart'}
            </Button>
          </Col>
        </Row>
        <div className="product-tabs mt-4">
          <Tab.Container activeKey={activeTab}>
            <Nav variant="tabs" activeKey={activeTab} onSelect={handleTabSelect}>
              <Nav.Item>
                <Nav.Link eventKey="description">Description</Nav.Link>
              </Nav.Item>
              {activeTab === 'description' && (
                <Description /> 
              )}
              <Nav.Item>
                <Nav.Link eventKey="reviews">Reviews</Nav.Link>
              </Nav.Item>
            </Nav>
            {activeTab === 'reviews' && <Reviews />}
            <Tab.Content className="mt-3">
              <Tab.Pane eventKey="description">
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
          <RelatedProducts/>
        </div>
        
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
