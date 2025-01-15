import React, { useState } from 'react';
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';
import Slider from 'react-slider'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductFilter = ({ products, onFilterChange }) => {
    const [checkedCategories, setCheckedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 100000]);
    const [userInfo, setUserInfo] = useState(null); 
    const navigate = useNavigate();

    const toggleCategory = (category) => {
        const updatedCategories = checkedCategories.includes(category)
            ? checkedCategories.filter((cat) => cat !== category)
            : [...checkedCategories, category];
        setCheckedCategories(updatedCategories);
        filterProducts(updatedCategories, priceRange);
    };

    const filterProducts = (categories, priceRange) => {
        const filtered = products.filter(
            (product) => 
                categories.includes(product.category) && 
                product.price >= priceRange[0] && 
                product.price <= priceRange[1]
        );
        onFilterChange(filtered);
    };

    const handlePriceChange = (value) => {
        setPriceRange(value);
        filterProducts(checkedCategories, value);
    };

    const handleCreateOrder = async () => {
        try {
            if (!userInfo) {
                return alert('Please log in to place an order.');
            }
            const cartProducts = products.filter(product =>
                checkedCategories.includes(product.category) && 
                product.price >= priceRange[0] && 
                product.price <= priceRange[1]
            );
            if (!cartProducts || cartProducts.length === 0) {
                return alert('Your cart is empty. Please add items to your cart.');
            }

            const totalAmount = cartProducts.reduce((total, product) => total + product.price, 0);

            if (!totalAmount || totalAmount <= 0) {
                return alert('Invalid total amount. Please review your cart.');
            }

            const orderData = {
                customerId: userInfo.data.user_id,
                cartItems: cartProducts,
                totalAmount: totalAmount,
                discountApplied: discountCode === 'SAVE35' ? 35 : 0,
            };

            const res = await axios.post('/api/orders', orderData);

            if (res?.data) {
                const orderId = res.data._id;
                navigate(`/payment/${orderId}`);
            } else {
                alert('Failed to place the order. Please try again.');
            }
        } catch (error) {
            alert('An error occurred while placing the order.');
        }
    };

    return (
        <div>
            <div className="categories-container">
                <h3>Product Categories</h3>
                <ul>
                    {['Body Parts', 'Engine Parts', 'Electrical Components', 'Suspension Parts', 'Transmission Parts'].map((category) => (
                        <li key={category} onClick={() => toggleCategory(category)}>
                            {checkedCategories.includes(category) ? <IoCheckboxOutline /> : <IoSquareOutline />} {category}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="categories-container">
                <h3>Filter by brand</h3>
                <ul>
                    {['Nissan', 'Subaru', 'Hyundai', 'Toyota', 'Vovlo', 'Mercedes-Benz'].map((brand) => (
                        <li key={brand} onClick={() => toggleCategory(brand)}>
                            {checkedCategories.includes(brand) ? <IoCheckboxOutline /> : <IoSquareOutline />} {brand}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="categories-container">
                <h3>Filter by price range</h3>
                <Slider
                    range
                    min={0}
                    max={100000}
                    defaultValue={[0, 100000]}
                    value={priceRange}
                    onChange={handlePriceChange}
                    trackStyle={{ backgroundColor: 'black' }}
                    handleStyle={{ borderColor: 'black', backgroundColor: 'black' }}
                    railStyle={{ backgroundColor: '#ccc' }}
                />
                <div>Price: Ksh{priceRange[0]} - Ksh{priceRange[1]}</div>
            </div>

            <div className="categories-container">
                <h3>Filter by condition</h3>
                <ul>
                    {['New', 'Used', 'Refurbished'].map((condition) => (
                        <li key={condition} onClick={() => toggleCategory(condition)}>
                            {checkedCategories.includes(condition) ? <IoCheckboxOutline /> : <IoSquareOutline />} {condition}
                        </li>
                    ))}
                </ul>
            </div>

            <button onClick={handleCreateOrder}>Place Order</button>
        </div>
    );
};

export default ProductFilter;
