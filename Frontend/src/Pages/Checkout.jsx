import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import Header from '../Homepage/Header';
import Footer from '../Homepage/Footer';
import { useCart } from '../context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from '../slices/OrderApiSlice.js';

const Checkout = () => {
    const { cart, updateCartItemQuantity, removeFromCart, calculateSubtotal, discount, calculateGrandTotal } = useCart();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [discountCode, setDiscountCode] = useState('');
    const [discountError, setDiscountError] = useState('');

    // Fetch user info from localStorage
    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        console.log('Stored User Info:', storedUserInfo);
        if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo));
        }
    }, []);

    const [createOrder] = useCreateOrderMutation();

    const applyDiscount = () => {
        if (discountCode === 'SAVE35') {
            setDiscountError('');
        } else {
            setDiscountError('Invalid discount code');
        }
    };

    const handleProceedToCheckout = () => {
        if (cart.length === 0) {
            alert('Your cart is empty. Add items to proceed.');
            return;
        }

        console.log('Proceeding to checkout...');
        // Navigate to the checkout page (if needed) or trigger order logic
        handleCreateOrder();
    };

    const handleCreateOrder = async () => {
        try {
            if (!userInfo) {
                return alert('Please log in to place an order.');
            }
            if (!cart || cart.length === 0) {
                return alert('Your cart is empty. Please add items to your cart.');
            }

            const totalAmount = calculateGrandTotal();
            if (!totalAmount || totalAmount <= 0) {
                return alert('Invalid total amount. Please review your cart.');
            }
            const customerId = userInfo._id;
            console.log(customerId, "customer Id")
            // Prepare the data for the order
            const orderData = {
                customerId,
                cartItems: cart,
                totalAmount,
                discountApplied: discountCode === 'SAVE35' ? 35 : 0, // Discount logic
            };

            // Use the createOrder mutation
            const res = await createOrder(orderData).unwrap();

            // If order creation is successful, redirect to payment page
            if (res) {
                console.log('Order created successfully:', res);
                const orderId = res._id; // Extract order ID from response

                // Redirect user to Payment Page with Order ID
                navigate(`/payment/${orderId}`);
            } else {
                console.error('Order creation failed:', res);
                alert('Failed to place the order. Please try again.');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            alert('An error occurred while placing the order.');
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

                        {/* Place Order Button */}
                        <button className="btn btn-success mt-3 me-2" onClick={handleCreateOrder}>Place Order</button>

                        <button className="btn btn-dark mt-3" onClick={handleProceedToCheckout}>Proceed to Checkout</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Checkout;
