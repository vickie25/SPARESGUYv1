import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom"; // To get productId from the URL

const  RelatedProducts = () => {
  const { productId } = useParams(); // Get productId from the URL
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!productId) {
      setError("No product ID provided.");
      return;
    }

    // Fetch related products from the backend
    axios
      .get(`http://localhost:8000/api/products/related/${productId}`)
      .then((response) => {
        if (response.data.length === 0) {
          setError("No related products found.");
        } else {
          setRelatedProducts(response.data);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch related products.");
      });
  }, [productId]);

  return (
    <div className="mt-4">
      <h5>Related Products</h5>
      {error && <p className="text-danger">{error}</p>}
      <Row>
        {relatedProducts.map((product) => (
          <Col key={product._id} md={3}>
            <div className="product-card">
              <img
                src={`http://localhost:8000${product.imageUrl}`} // Assuming `imageUrl` is correct
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
