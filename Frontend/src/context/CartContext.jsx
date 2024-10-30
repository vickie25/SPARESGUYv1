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

    const [discount, setDiscount] = useState(() => {
        const savedDiscount = localStorage.getItem('discount');
        return savedDiscount ? JSON.parse(savedDiscount) : { code: '', amount: 0 };
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('discount', JSON.stringify(discount));
    }, [discount]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.productId === product._id);

            if (existingItem) {
                // Increment quantity by product's quantity
                return prevCart.map(item =>
                    item.productId === product._id
                        ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                        : item
                );
            } else {
                return [...prevCart, {
                    productId: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: product.quantity || 1 // Default to 1 if no quantity passed
                }];
            }
        });
    };


    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.productId !== productId));
    };

    const updateCartItemQuantity = (productId, change) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.productId === productId
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        );
    };

    const calculateSubtotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const applyDiscount = (code) => {
        if (code === 'SAVE35') {
            setDiscount({ code, amount: 35 });
            return { success: true, message: 'Discount applied successfully!' };
        }
        setDiscount({ code: '', amount: 0 });
        return { success: false, message: 'Invalid discount code' };
    };

    const calculateGrandTotal = () => {
        const subtotal = calculateSubtotal();
        return Math.max(0, subtotal - discount.amount);
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateCartItemQuantity,
            calculateSubtotal,
            applyDiscount,
            calculateGrandTotal,
            discount
        }}>
            {children}
        </CartContext.Provider>
    );
};
