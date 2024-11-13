import React, { useState, useEffect, useContext } from 'react';
import { FaTrash } from 'react-icons/fa';
import Header from '../Homepage/Header';
import Footer from '../Homepage/Footer';
import { useCart } from '../context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from '../slices/CheckoutApiSlice'; // Import the API slice
//import { CartContext } from '../context/CartContext'; // Assuming CartContext is available
// import { useUser } from './UserContext';
// import moment from 'moment'; 

const Checkout = () => {
  const { cart, updateCartItemQuantity, removeFromCart, calculateSubtotal, discount, calculateGrandTotal } = useCart();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  // Discount code state
  const [discountCode, setDiscountCode] = useState('');
  const [discountError, setDiscountError] = useState('');

  useEffect(() => {
    // Fetch userInfo from localStorage and parse it
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo)); 
    } else {
      console.log("No user info found in localStorage");
    }
  }, [navigate]);

  // console.log(userInfo?.data?.user_id);
  // console.log(userInfo);

  // Use createOrder mutation from API slice
  const [createOrder] = useCreateOrderMutation();

  // Apply discount code
  const applyDiscount = () => {
    if (discountCode === 'SAVE35') {
      setDiscountError('');
    } else {
      setDiscountError('Invalid discount code');
    }
  };

  // Proceed to checkout
  const handleProceedToCheckout = async () => {
    // Make sure userInfo is available
    if (!userInfo) {
      return alert('Please log in to proceed.');
    }

    // Extract cart product data and calculate total
    const cartProducts = cart.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      name: item?.name || "just A name"
    }));

    const totalAmount = calculateGrandTotal().toFixed(2);

    // Get current date formatted (optional)
    const orderDate = moment().format('DD/MM/YYYY'); // Format date as '14/01/2024.'

    try {
      // Call createOrder API to create the order
      const res = await createOrder({
        customerId: userInfo?.data?.user_id, // Dynamically get customer ID
        cartItems: cartProducts,
        totalAmount: totalAmount,
        discountApplied: discountCode === 'SAVE35' ? 35 : 0, // Apply discount if valid
        orderDate: orderDate, 
      });
      console.log(userInfo?.data?.user_id);
      console.log(userInfo);
      console.log('This is the response:', res);

      const orderId = res?.data._id
      console.log(orderId, "this is just an Id")
      // Optionally, you can redirect to the order confirmation page
      navigate(`/payment/${orderId}`);

    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="checkout-container" style={{ padding: '20px', height: '80vh' }}>
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
                  <button onClick={() => updateCartItemQuantity(item.productId, -1)} className="btn btn-outline-secondary" disabled={item.quantity === 1}>-</button>
                  <input type="text" className="form-control w-25 text-center mx-2" value={item.quantity} readOnly />
                  <button onClick={() => updateCartItemQuantity(item.productId, 1)} className="btn btn-outline-secondary">+</button>
                </div>
                <p><strong>Ksh{(item.price * item.quantity).toFixed(2)}</strong></p>
                <button onClick={() => removeFromCart(item.productId)} className="btn btn-danger">
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
            <h4>Subtotal: <strong>Ksh{calculateSubtotal().toFixed(2)}</strong></h4>
            <h4>Discount Applied: <strong>Ksh{discount.amount.toFixed(2)}</strong></h4>
            <h4>Grand Total: <strong>Ksh{calculateGrandTotal().toFixed(2)}</strong></h4>
            <button className="btn btn-dark mt-3" onClick={handleProceedToCheckout}>Proceed to Checkout</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
