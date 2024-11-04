import React, { useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { RiDeleteBin6Line } from 'react-icons/ri';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "./PagesCSS/shoppingPage.css";

const CartDropdown = ({ isDropdownVisible, toggleDropdown }) => {
    const { cart, removeFromCart, calculateSubtotal, addToCart } = useCart();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);  // Ref for the dropdown

    // Handle click outside of the dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                toggleDropdown(false);  // Close dropdown if click is outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside); // Listen for outside clicks
        return () => document.removeEventListener('mousedown', handleClickOutside);  // Cleanup
    }, [toggleDropdown]);

    const handleCheckout = async () => {
        const cartData = {
            products: cart.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
            })),
            totalAmount: calculateSubtotal(),
            paymentMethod: 'Credit/Debit',  // Ensure paymentMethod matches enum values
        };

        try {
            await axios.post('http://localhost:8000/api/cart/save', cartData);
            console.log('Cart saved successfully!');
            navigate('/checkout');  // Redirect to checkout page
        } catch (error) {
            if (error.response) {
                // Backend returned an error
                console.error('Error response:', error.response.data);
                alert(`Error saving cart: ${error.response.data.message}`);
            } else if (error.request) {
                // Request made but no response received
                console.error('No response received:', error.request);
                alert('No response from the server. Please try again later.');
            } else {
                // Something else caused the error
                console.error('Error:', error.message);
                alert(`Error: ${error.message}`);
            }
        }
    };

    return (
        isDropdownVisible && (
            <div className="cart-dropdown" ref={dropdownRef}> {/* Attach ref here */}
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div>
                        <h2>Order Summary</h2>
                        {cart.map((item, index) => (
                            <div key={index} className="cart-dropdown-item">
                                <img src={`http://localhost:8000${item.image}`} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h4>{item.name}</h4>
                                    <p><b>{item.quantity} * Ksh{item.price} </b></p>
                                    <p><b>Total: Ksh{item.price * item.quantity}</b></p>
                                </div>
                                <button onClick={() => removeFromCart(item.productId)} className="delete-button">
                                    <RiDeleteBin6Line />
                                </button>
                            </div>
                        ))}
                        <div className="cart-subtotal">
                            <p>Subtotal: <strong>Ksh{calculateSubtotal()}</strong></p>
                        </div>
                        <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
                    </div>
                )}
            </div>
        )
    );
};

export default CartDropdown;
