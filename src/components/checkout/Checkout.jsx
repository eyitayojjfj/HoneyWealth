// src/Checkout.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css'; // Assuming you will add styles in Checkout.css

const Checkout = () => {
    const [cart, setCart] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        country: 'us',
        cardNumber: '',
        expDate: '',
        cvv: ''
    });

    useEffect(() => {
        try {
            const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
            setCart(savedCart);
        } catch (error) {
            console.error('Failed to load cart from localStorage:', error);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would handle form submission to your backend or payment processor
        alert('Order placed successfully!');
        // Clear cart and navigate to confirmation or home page
        localStorage.removeItem('cart');
        setCart([]);
        navigate('/');
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = item.quantity || 1;
            return total + (price * quantity);
        }, 0).toFixed(2);
    };

    const navigate = useNavigate();

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            <form onSubmit={handleSubmit}>
                <div className="section">
                    <h2>Billing Information</h2>
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="address">Shipping Address</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="3"
                        required
                    ></textarea>

                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="zip">ZIP Code</label>
                    <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="country">Country</label>
                    <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                    >
                        <option value="us">United States</option>
                        <option value="ca">Canada</option>
                        <option value="uk">United Kingdom</option>
                        {/* Add more options as needed */}
                    </select>
                </div>

                <div className="section">
                    <h2>Payment Information</h2>
                    <label htmlFor="card-number">Card Number</label>
                    <input
                        type="text"
                        id="card-number"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="exp-date">Expiration Date</label>
                    <input
                        type="text"
                        id="exp-date"
                        name="expDate"
                        value={formData.expDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        required
                    />

                    <label htmlFor="cvv">CVV</label>
                    <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="section">
                    <h2>Order Summary</h2>
                    <div className="order-summary">
                        <ul>
                            {cart.map((item, index) => (
                                <li key={item.id || index}>
                                    {item.name} - ₦ {(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)} x {item.quantity || 1}
                                </li>
                            ))}
                        </ul>
                        <p><strong>Total Price: ₦ {calculateTotalPrice()}</strong></p>
                    </div>
                </div>

                <button type="submit">Complete Purchase</button>
            </form>
        </div>
    );
};

export default Checkout;
