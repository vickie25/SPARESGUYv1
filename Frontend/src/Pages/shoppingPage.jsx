import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card, Pagination } from 'react-bootstrap';
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
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
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data); // Ensure data is an array
        } else {
          console.error('Expected an array but got:', data);
        }
      })
      .catch((error) => console.error('Error fetching products:', error));
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
                  <h4 style={{ fontWeight: 'bold', textAlign: 'left' }}>Filter by</h4>
                  <hr />
                  <h5 className="mb-3" style={{ fontWeight: 'bold', textAlign: 'left' }}>Categories</h5>
                  {['Service Parts', 'Interchangeable parts', 'Second Hand'].map((category) => (
                    <div key={category} className="d-flex align-items-center mb-2">
                      <Form.Check
                        type="checkbox"
                        checked={checkedCategories.includes(category)}
                        onChange={() =>
                          setCheckedCategories((prev) =>
                            prev.includes(category)
                              ? prev.filter((c) => c !== category)
                              : [...prev, category]
                          )
                        }
                        style={{ accentColor: '#DAA520' }}
                        inputProps={{ style: { accentColor: '#DAA520' } }}
                      />
                      <span className="ms-2">{category}</span>
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <h5 className="mb-3" style={{ fontWeight: 'bold', textAlign: 'left' }}>Brands</h5>
                  {[
                    'Toyota',
                    'Hero Genuine Parts',
                    'Suzuki Genuine Parts',
                    'Honda Genuine Parts',
                    'Yamaha Genuine Parts',
                  ].map((brand) => (
                    <div key={brand} className="d-flex align-items-center mb-2">
                      <Form.Check
                        type="checkbox"
                        checked={checkedBrands.includes(brand)}
                        onChange={() =>
                          setCheckedBrands((prev) =>
                            prev.includes(brand)
                              ? prev.filter((b) => b !== brand)
                              : [...prev, brand]
                          )
                        }
                        style={{ accentColor: '#DAA520' }}
                        inputProps={{ style: { accentColor: '#DAA520' } }}
                      />
                      <span className="ms-2">{brand}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <h5 className="mb-3" style={{ fontWeight: 'bold', textAlign: 'left' }}>Condition</h5>
                  {['New', 'Used', 'Refurbished'].map((condition) => (
                    <div key={condition} className="d-flex align-items-center mb-2">
                      <Form.Check
                        type="checkbox"
                        checked={checkedConditions.includes(condition)}
                        onChange={() =>
                          setCheckedConditions((prev) =>
                            prev.includes(condition)
                              ? prev.filter((c) => c !== condition)
                              : [...prev, condition]
                          )
                        }
                        style={{ accentColor: '#DAA520' }}
                        inputProps={{ style: { accentColor: '#DAA520' } }}
                      />
                      <span className="ms-2">{condition}</span>
                    </div>
                  ))}
                </div>
            

              <div className="mb-4">
            <h5 className="mb-3" style={{ fontWeight: 'bold', textAlign: 'left' }}>Price Range</h5>
                <Slider
                  range
                  min={0}
                  max={100000}
                  value={priceRange}
                  onChange={handlePriceChange}
                  marks={{ 0: '0', 50000: '50K', 100000: '100K' }}
                  handleStyle={{ borderColor: 'black', backgroundColor: 'black', boxShadow: 'black', outline: 'none' }}
                  trackStyle={{ backgroundColor: 'black' }}

                />
                <p className="mt-2">Price: Ksh {priceRange[0]} - Ksh {priceRange[1]}</p>
              </div>

          </Col>
          {/* Products Section */}
          <Col md={9}>
          <Col md={9}>
  <div className="d-flex justify-content-between align-items-center mb-3">
    <Link to="/shop" className="btn btn-link" style={{ color: 'goldenrod' }}>Shop</Link>
    <Link to="/All products" className="btn btn-link" style={{ color: 'goldenrod' }}>All products</Link>
  </div>
</Col>

<Row>
  {currentProducts.map((product) => (
    <Col lg={4} md={6} sm={12} className="mb-4" key={product._id}>
      <Card className="h-100 d-flex flex-column justify-content-between" style={{ height: '500px' }}>
        {isInWishlist(product._id) ? (
          <MdFavorite
            className="text-danger position-absolute m-2"
            style={{ right: '0' }}
            onClick={() => removeFromWishlist(product._id)}
          />
        ) : (
          <MdFavoriteBorder
            className="position-absolute m-2"
            style={{ right: '0' }}
            onClick={() => addToWishlist(product)}
          />
        )}
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Card.Img
            variant="top"
            src={`http://localhost:8000${product.image}`}
            alt={product.name}
            className="card-img-top"
            style={{
              objectFit: 'cover',
              height: '200px',
              borderRadius: '8px 8px 0 0',
            }}
          />
          {/* Card Body */}
          <Card.Body className="text-center">
            <Card.Title style={{ fontSize: '1.1rem', fontWeight: '600' }}>
              {product.name}
            </Card.Title>
            <Card.Text style={{ color: '#28a745', fontWeight: '500', fontSize: '1rem' }}>
              Ksh {product.price}
            </Card.Text>
          </Card.Body>
        </Link>

        <Button
          variant="primary"
          onClick={() => addToCart({ ...product, quantity: 1 })}
          className="mt-auto"
          style={{ backgroundColor: 'black', borderColor: 'black' }}
        >
          Add to Cart
        </Button>
      </Card>
    </Col>
  ))}
</Row>

                  
            {filteredProducts.length === 0 && <p>No products match your search criteria.</p>}

            <Pagination className="justify-content-center">
              <Pagination.Prev style={{ backgroundColor: '#DAA520', color: '#000000' }}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <IoIosArrowRoundBack style={{ color: '#000000' }} />
              </Pagination.Prev>
              <Pagination.Item active style={{ backgroundColor: '#DAA520', color: '#000000' }}>
                {currentPage}
              </Pagination.Item>
              <Pagination.Next
  onClick={() => handlePageChange(currentPage + 1)}
  disabled={currentPage === totalPages}
  style={{ backgroundColor: 'goldenrod' }}
>

                <IoIosArrowRoundForward style={{ color: '#000000' }} />
              </Pagination.Next>
            </Pagination>

          </Col>
        </Row>
      </Container >
      <Footer />
    </div >
  );
};

export default ShoppingPage;
