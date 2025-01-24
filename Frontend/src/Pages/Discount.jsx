import React, { useState } from "react";

const Discount = ({ applyDiscountToOrder }) => {
  const [discountCode, setDiscountCode] = useState("");
  const [discountError, setDiscountError] = useState("");

  const handleApplyDiscount = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/discounts/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ discountCode }),
      });
  
      const data = await response.json();
  
      if (data.valid) {
        setDiscountError("");
        applyDiscountToOrder(data.discount);
      } else {
        setDiscountError(data.message);
      }
    } catch (error) {
      setDiscountError("Error validating discount code");
    }
  };
  return (
    <div>
      <h3>Apply Discount</h3>
      <input
        type="text"
        placeholder="Enter discount code"
        value={discountCode}
        onChange={(e) => setDiscountCode(e.target.value)}
      />
      <button onClick={handleApplyDiscount}>Apply</button>
      {discountError && <p style={{ color: "red" }}>{discountError}</p>}
    </div>
  );
};

export default Discount;
