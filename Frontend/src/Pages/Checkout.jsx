import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import airfilters from '../Homepage/HomepageImages/airfilters.svg'
import Header from '../Homepage/Header';
import Footer from '../Homepage/Footer';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: airfilters, price: 235.00, quantity: 1, },
    { id: 2, name: airfilters, price: 235.00, quantity: 1, },
    { id: 3, name: airfilters, price: 235.00, quantity: 1, },
  ]);

  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(0);
  const [discountError, setDiscountError] = useState('');

  const updateQuantity = (id, increment) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + increment };
      }
      return item;
    }).filter(item => item.quantity > 0);

    setCartItems(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
  };

  const applyDiscount = () => {
    if (discountCode === 'SAVE35') {
      setDiscountApplied(35); 
      setDiscountError('');
    } else {
      setDiscountError('Invalid discount code');
      setDiscountApplied(0);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  };

  const calculateGrandTotal = () => {
    return calculateSubtotal() - discountApplied;
  };

  return (
    <>
    <Header/>
    <div className="checkout-container" style={{ padding: '20px' }}>
      <h1>Checkout</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-section">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', padding: '10px 0' }}>
              <div className="item-details" style={{ display: 'flex', alignItems: 'center' }}>
                <img src={airfilters} alt={item.name} style={{ width: '50px', marginRight: '15px' }} />
                <div>
                  <p>{item.name}</p>
                  <p><strong>${item.price.toFixed(2)}</strong></p>
                </div>
              </div>
              <div className="item-quantity" style={{ display: 'flex', alignItems: 'center' }}>
                <button 
                  onClick={() => updateQuantity(item.id, -1)} 
                  className="btn btn-outline-secondary" 
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <input type="text" className="form-control w-25 text-center mx-2" value={item.quantity} readOnly />
                <button onClick={() => updateQuantity(item.id, 1)} className="btn btn-outline-secondary">+</button>
              </div>
              <p><strong>${(item.price * item.quantity).toFixed(2)}</strong></p>
              <button onClick={() => removeItem(item.id)} className="btn btn-danger">
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
          <button onClick={applyDiscount} className="btn btn-dark mt-2">Apply</button>
          {discountError && <p style={{ color: 'red' }}>{discountError}</p>}
        </div>

        <div className="totals-section" style={{ width: '40%', border: '1px solid #ddd', padding: '20px' }}>
          <h4>Subtotal: <strong>${calculateSubtotal().toFixed(2)}</strong></h4>
          <h4>Discount Applied: <strong>${discountApplied.toFixed(2)}</strong></h4>
          <h4>Grand Total: <strong>${calculateGrandTotal().toFixed(2)}</strong></h4>
          <button className="btn btn-dark mt-3">Proceed to Checkout</button>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Checkout;
