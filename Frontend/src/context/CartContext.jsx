import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.productId === product._id);

            if (existingItem) {
                return prevCart.map(item =>
                    item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, {
                    productId: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.productId !== productId));
    };

    const calculateSubtotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, calculateSubtotal }}>
            {children}
        </CartContext.Provider>
    );
};
