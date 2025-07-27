import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom"; // To get productId from the URL

const RelatedProducts = () => {
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
      .get(`/related/${productId}`)
      .then((response) => {
        setRelatedProducts(response.data);
      })
      .catch((error) => {
        setError("Failed to fetch related products.");
      });
  }, [productId]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <Row>
      {relatedProducts.map((product) => (
        <Col key={product.id} md={4}>
          <div className="product-card">
            <img src={product.image} alt={product.name} className="img-fluid" />
            <h5>{product.name}</h5>
            <p>{product.price}</p>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default RelatedProducts;