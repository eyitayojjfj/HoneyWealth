import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../FireBase'; 
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../account/AuthContext'; 
import './Checkout.css'; 

const Checkout = () => {
    const [cart, setCart] = useState([]);
    const [shippingMethod, setShippingMethod] = useState('');
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
    
    const navigate = useNavigate();
    const { currentUser } = useAuth(); 

    useEffect(() => {
        const fetchCart = async () => {
            if (currentUser) {
                try {
                    const userDocRef = doc(db, 'Users', currentUser.uid);
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setCart(userData.cart || []);
                    } else {
                        console.log('No cart data found');
                    }
                } catch (error) {
                    console.error('Failed to load cart from Firestore:', error);
                }
            }
        };

        fetchCart();
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Order placed successfully!');
        setCart([]);
        navigate('/');
    };

    const parsePrice = (priceString) => {
        const price = parseFloat(priceString.replace(/[^0-9.-]+/g, ""));
        return isNaN(price) ? 0 : price;
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
        }).format(price);
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => {
            const price = parsePrice(item.price) || 0;
            const quantity = item.quantity || 1;
            return total + (price * quantity);
        }, 0).toFixed(2);
    };

    const calculateTotalQuantity = () => {
        return cart.reduce((total, item) => total + (item.quantity || 1), 0);
    };

    const handleShippingChange = (event) => {
        setShippingMethod(event.target.value);
    };

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
                        <option value="ng">Nigeria</option>
                        <option value="gh">Ghana</option>
                    </select>
                </div>
                 
                <div className="section">
                    <div className="shipping-method">
                        <h2>Shipping Method</h2>
                        <div className={`option ${shippingMethod === 'deliver' ? 'selected' : ''}`} onClick={() => setShippingMethod('deliver')}>
                            <input
                                type="radio"
                                id="deliver"
                                name="shipping"
                                value="deliver"
                                checked={shippingMethod === 'deliver'}
                                onChange={handleShippingChange}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="deliver">Deliver to me</label>
                        </div>

                        <div className={`option ${shippingMethod === 'pickup' ? 'selected' : ''}`} onClick={() => setShippingMethod('pickup')}>
                            <input
                                type="radio"
                                id="pickup"
                                name="shipping"
                                value="pickup"
                                checked={shippingMethod === 'pickup'}
                                onChange={handleShippingChange}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="pickup">Self Pickup</label>
                        </div>

                        {shippingMethod === 'pickup' && (
                            <div className='pickup'>
                                <h4>Pickup Address</h4>
                                <label htmlFor="pickup-location">CITS University Of Lagos</label>
                            </div>
                        )}
                    </div>
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
                                    {item.name} - {formatPrice(parsePrice(item.price) * (item.quantity || 1))} x {item.quantity || 1}
                                </li>
                            ))}
                        </ul>
                        <p><strong>Total Quantity: {calculateTotalQuantity()}</strong></p>
                        <p><strong>Total Price: {formatPrice(calculateTotalPrice())}</strong></p>
                    </div>
                </div>

                <button className='check-btn' type="submit">Complete Purchase</button>
            </form>
        </div>
    );
};

export default Checkout;
