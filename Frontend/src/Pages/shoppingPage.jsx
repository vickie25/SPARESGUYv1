import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card, Pagination } from 'react-bootstrap';
import {IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import Slider from 'rc-slider';
import { IoFilter } from "react-icons/io5";
import 'rc-slider/assets/index.css';
import Footer from '../Homepage/Footer';
import Header from '../Homepage/Header';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { SearchContext } from '../context/SearchContext';
import { useWishlist } from '../context/WishlistContext';

const ShoppingPage = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const context = useContext(SearchContext);
  const searchQuery = context?.searchQuery || '';
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedBrands, setCheckedBrands] = useState([]);
  const [checkedConditions, setCheckedConditions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const productsPerPage = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const isCategoryMatch = checkedCategories.length === 0 || checkedCategories.includes(product.category);
      const isBrandMatch = checkedBrands.length === 0 || checkedBrands.includes(product.brand);
      const isConditionMatch = checkedConditions.length === 0 || checkedConditions.includes(product.condition);
      const isPriceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];

      return isCategoryMatch && isBrandMatch && isConditionMatch && isPriceMatch;
    });
    setFilteredProducts(filtered);
  }, [checkedCategories, checkedBrands, checkedConditions, priceRange, products]);

  const handlePriceChange = (range) => setPriceRange(range);

  const handlePageChange = (page) => setCurrentPage(page);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const isInWishlist = (itemId) => wishlist.some(item => item.productId === itemId);

  return (
    <div>
      <Header />
      <Container>
        <Row className="my-3">
        <Col md={3}>
  <div className="mb-4">
    <h5 className="mb-3">Categories</h5>
    {['Service Parts', 'Interchangeable parts', 'Second Hand'].map((category) => (
      <Form.Check
        key={category}
        type="checkbox"
        label={category}
        className="mb-2"
        checked={checkedCategories.includes(category)}
        onChange={() =>
          setCheckedCategories((prev) =>
            prev.includes(category)
              ? prev.filter((c) => c !== category)
              : [...prev, category]
          )
        }
      />
    ))}
  </div>

  <div className="mb-4">
    <h5 className="mb-3">Brands</h5>
    {[
      'Toyota',
      'Hero Genuine Parts',
      'Suzuki Genuine Parts',
      'Honda Genuine Parts',
      'Yamaha Genuine Parts',
    ].map((brand) => (
      <Form.Check
        key={brand}
        type="checkbox"
        label={brand}
        className="mb-2"
        checked={checkedBrands.includes(brand)}
        onChange={() =>
          setCheckedBrands((prev) =>
            prev.includes(brand)
              ? prev.filter((b) => b !== brand)
              : [...prev, brand]
          )
        }
      />
    ))}
  </div>

  <div className="mb-4">
    <h5 className="mb-3">Condition</h5>
    {['New', 'Used', 'Refurbished'].map((condition) => (
      <Form.Check
        key={condition}
        type="checkbox"
        label={condition}
        className="mb-2"
        checked={checkedConditions.includes(condition)}
        onChange={() =>
          setCheckedConditions((prev) =>
            prev.includes(condition)
              ? prev.filter((c) => c !== condition)
              : [...prev, condition]
          )
        }
      />
    ))}
  </div>

  <div className="mb-4">
    <h5 className="mb-3">Price Range</h5>
    <Slider
      range
      min={0}
      max={100000}
      value={priceRange}
      onChange={handlePriceChange}
      marks={{ 0: '0', 50000: '50K', 100000: '100K' }}
    />
    <p className="mt-2">Price: Ksh {priceRange[0]} - Ksh {priceRange[1]}</p>
  </div>
</Col>

          <Col md={9}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Link to="/shop" className="btn btn-link">Shop</Link>
              <Link to="/All products" className="btn btn-link">All products</Link>
              <IoFilter className="text-primary" size={24} />
            </div>
            <Row>
              {currentProducts.map((product) => (
                <Col lg={4} md={6} sm={12} className="mb-4" key={product._id}>
                  <Card>
                    {isInWishlist(product._id) ? (
                      <MdFavorite
                        className="text-danger position-absolute m-2"
                        onClick={() => removeFromWishlist(product._id)}
                      />
                    ) : (
                      <MdFavoriteBorder
                        className="position-absolute m-2"
                        onClick={() => addToWishlist(product)}
                      />
                    )}
                    <Card.Img
                      variant="top"
                      src={`http://localhost:8000${product.image}`}
                      alt={product.name}
                    />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>Ksh {product.price}</Card.Text>
                      <Button variant="primary" onClick={() => addToCart({ ...product, quantity: 1 })}>
                        Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {filteredProducts.length === 0 && <p>No products match your search criteria.</p>}

            <Pagination className="justify-content-center">
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <IoIosArrowRoundBack />
              </Pagination.Prev>
              <Pagination.Item active>{currentPage}</Pagination.Item>
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <IoIosArrowRoundForward />
              </Pagination.Next>
            </Pagination>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default ShoppingPage;
