import React, { useState } from "react";
import Reviews from "./Reviews";
import description from './description';

const ProductTabs = ({ productDescription, additionalInfo, productReviews }) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div>
      <div style={{ display: "flex", borderBottom: "1px solid #ccc" }}>
        <button
          style={{
            flex: 1,
            padding: "10px",
            border: "none",
            background: activeTab === "description" ? "#fff" : "#f9f9f9",
            borderBottom: activeTab === "description" ? "2px solid black" : "none",
            cursor: "pointer",
          }}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          style={{
            flex: 1,
            padding: "10px",
            border: "none",
            background: activeTab === "additionalInfo" ? "#fff" : "#f9f9f9",
            borderBottom: activeTab === "additionalInfo" ? "2px solid black" : "none",
            cursor: "pointer",
          }}
          onClick={() => setActiveTab("additionalInfo")}
        >
          Additional Information
        </button>
        <button
          style={{
            flex: 1,
            padding: "10px",
            border: "none",
            background: activeTab === "reviews" ? "#fff" : "#f9f9f9",
            borderBottom: activeTab === "reviews" ? "2px solid black" : "none",
            cursor: "pointer",
          }}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      <div style={{ padding: "20px" }}>
        {activeTab === "description" && (
          <div>
            <h2>Description</h2>
            <p>{productDescription}</p>
          </div>
        )}
        {activeTab === "additionalInfo" && (
          <div>
            <h2>Additional Information</h2>
            <p>{additionalInfo}</p>
          </div>
        )}
        {activeTab === "reviews" && (
          <div>
            <h2>Reviews</h2>
            <Reviews reviews={productReviews} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
