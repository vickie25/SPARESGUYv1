import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

const RelatedProducts = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // Fetch related products (use the same API or filter by category)
    axios.get('http://localhost:8000/api/products/related')
      .then((response) => setRelatedProducts(response.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="mt-4">
      <h5>Related Products</h5>
      <Row>
        {relatedProducts.map((product) => (
          <Col key={product._id} md={3}>
            <div className="product-card">
              <img
                src={`http://localhost:8000${product.image}`}
                alt={product.name}
                className="img-fluid"
              />
              <h6>{product.name}</h6>
              <p>Ksh {product.price}</p>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default RelatedProducts;
