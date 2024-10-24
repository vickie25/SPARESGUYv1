import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the CartContext
const CartContext = createContext();

// CartProvider to wrap the app and provide the cart state and functions
export const CartProvider = ({ children }) => {
    // Retrieve the cart from localStorage if it exists, otherwise use an empty array
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Update localStorage whenever the cart state changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Function to add items to the cart
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                // Update quantity if the item already exists
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // Add new item if it doesn't exist
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    // Function to remove an item from the cart
    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    // Function to update the quantity of a cart item
    const updateQuantity = (id, quantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + quantity } : item
            )
        );
    };

    // Function to clear the cart after checkout
    const clearCart = () => {
        setCart([]);
    };

    // Function to calculate the subtotal
    const calculateSubtotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, calculateSubtotal }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook to use the CartContext in any component
export const useCart = () => useContext(CartContext);
