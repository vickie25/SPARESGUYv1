import React, { useState } from "react";

const description = () => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div>
      {/* Tabs Navigation */}
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

      {/* Tab Content */}
      <div style={{ padding: "20px" }}>
        {activeTab === "description" && (
          <div>
            <h2>Description</h2>
            <p>
              Enhance your driving visibility with our premium Car Headlight,
              designed for optimal performance and safety. This high-quality
              headlight offers bright, clear illumination, ensuring excellent
              road visibility even in low-light or harsh weather conditions.
              Built with durable materials, it features a long-lasting lifespan,
              energy efficiency, and easy installation. Compatible with a wide
              range of vehicle makes and models, it meets all safety and OEM
              standards.
            </p>
            <p>
              Whether you're upgrading or replacing your headlight, this is the
              perfect solution for clear, reliable lighting on every journey.
            </p>
          </div>
        )}
        {activeTab === "additionalInfo" && (
          <div>
            <h2>Additional Information</h2>
            <p>Here you can include details like technical specifications.</p>
          </div>
        )}
        {activeTab === "reviews" && (
          <div>
            <h2>Reviews</h2>
            <p>Customer reviews will be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default description;
