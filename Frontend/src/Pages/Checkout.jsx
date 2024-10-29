import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import Header from '../Homepage/Header';
import Footer from '../Homepage/Footer';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const {
    cart,
    removeFromCart,
    updateCartItemQuantity,
    calculateSubtotal,
    calculateGrandTotal,
    applyDiscount,
    discount
  } = useCart();

  const [discountCode, setDiscountCode] = useState('');
  const [discountError, setDiscountError] = useState('');

  const handleApplyDiscount = () => {
    const result = applyDiscount(discountCode);
    if (!result.success) {
      setDiscountError(result.message);
    } else {
      setDiscountError('');
    }
  };

  return (
    <>
      <Header />
      <div className="checkout-container" style={{ padding: '20px' }}>
        <h1>Checkout</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-section">
            {cart.map((item) => (
              <div key={item.productId} className="cart-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', padding: '10px 0' }}>
                <div className="item-details" style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={`http://localhost:8000${item.image}`} alt={item.name} style={{ width: '50px', marginRight: '15px' }} />
                  <div>
                    <p>{item.name}</p>
                    <p><strong>Ksh{item.price.toFixed(2)}</strong></p>
                  </div>
                </div>
                <div className="item-quantity" style={{ display: 'flex', alignItems: 'center' }}>
                  <button
                    onClick={() => updateCartItemQuantity(item.productId, -1)}
                    className="btn btn-outline-secondary"
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="form-control w-25 text-center mx-2"
                    value={item.quantity}
                    readOnly
                  />
                  <button
                    onClick={() => updateCartItemQuantity(item.productId, 1)}
                    className="btn btn-outline-secondary"
                  >
                    +
                  </button>
                </div>
                <p><strong>Ksh{(item.price * item.quantity).toFixed(2)}</strong></p>
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="btn btn-danger"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="summary-section" style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <div className="discount-section" style={{ width: '50%' }}>
            <h4>Enter Discount Code</h4>
            <input
              type="text"
              className="form-control"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Enter Discount Code"
            />
            <button
              onClick={handleApplyDiscount}
              className="btn btn-dark mt-2"
            >
              Apply
            </button>
            {discountError && <p style={{ color: 'red' }}>{discountError}</p>}
          </div>

          <div className="totals-section" style={{ width: '40%', border: '1px solid #ddd', padding: '20px' }}>
            <h4>Subtotal: <strong>Ksh{calculateSubtotal().toFixed(2)}</strong></h4>
            <h4>Discount Applied: <strong>Ksh{discount.amount.toFixed(2)}</strong></h4>
            <h4>Grand Total: <strong>Ksh{calculateGrandTotal().toFixed(2)}</strong></h4>
            <button className="btn btn-dark mt-3">Proceed to Checkout</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
