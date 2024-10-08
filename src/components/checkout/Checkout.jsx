// In Checkout.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../FireBase'; 
import { doc, getDoc, updateDoc, collection, addDoc, arrayUnion } from 'firebase/firestore';
import { useAuth } from '../account/AuthContext'; 
import emailjs from '@emailjs/browser';
import './Checkout.css'; 

const Checkout = () => {
    const [cart, setCart] = useState([]);
    const [shippingMethod, setShippingMethod] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('ng');
    
    const [orderSummary, setOrderSummary] = useState({
        totalQuantity: 0,
        totalPrice: 0
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

    useEffect(() => {
        const calculateOrderSummary = () => {
            const totalQuantity = cart.reduce((total, item) => total + (item.quantity || 1), 0);
            const totalPrice = cart.reduce((total, item) => {
                const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
                const quantity = item.quantity || 1;
                return total + (price * quantity);
            }, 0).toFixed(2);

            setOrderSummary({
                totalQuantity,
                totalPrice
            });
        };

        calculateOrderSummary();
    }, [cart]);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const serviceId = import.meta.env.VITE_SERVICE_ID;    
        const templateId = import.meta.env.VITE_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_PUBLIC_KEY;
    
        const templateParams = {
            from_name: name,
            from_email: email,
            phone: phone,
            address: address,
            city: city,
            zip: zip,
            country: country,
            shippingMethod: shippingMethod,
            paymentMethod: paymentMethod,
            cart: cart.map(item => `${item.name} - ${item.price} x ${item.quantity}`).join(', '),  
            totalQuantity: orderSummary.totalQuantity,
            totalPrice: orderSummary.totalPrice
        };
    
        console.log('Sending email with params:', templateParams); 
    
        emailjs.send(serviceId, templateId, templateParams, publicKey)
        .then(async (response) => {
            console.log('Email sent successfully:', response);

            // Save the order to Firestore in the 'Users' collection (as an array)
            if (currentUser) {
                const userDocRef = doc(db, 'Users', currentUser.uid);
                const newOrder = {
                    cart,
                    name,
                    email,
                    phone,
                    address,
                    city,
                    zip,
                    country,
                    shippingMethod,
                    paymentMethod,
                    totalQuantity: orderSummary.totalQuantity,
                    totalPrice: orderSummary.totalPrice,
                    orderDate: new Date().toISOString(),
                };
                try {
                    // Use arrayUnion to append the order to the orders array
                    await updateDoc(userDocRef, {
                        orders: arrayUnion(newOrder),  // Add order to orders array
                        cart: []  // Reset the cart to an empty array
                    });
                    console.log('Order added to user\'s orders and cart reset');
                } catch (error) {
                    console.error('Failed to save order in Firestore:', error);
                }
            }

            // Reset local state
            setName('');
            setEmail('');
            setPhone('');
            setAddress('');
            setCity('');
            setZip('');
            setCountry('ng');
            setShippingMethod('');
            setPaymentMethod('');
            setOrderSummary({
                totalQuantity: 0,
                totalPrice: 0
            });
            alert('Order placed successfully');
            setCart([]);  // Clear the local cart
            navigate('/');
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            alert('Failed to place order. Please try again later.');
        });
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

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            <form onSubmit={handleSubmit}>
                <div className="bill">
                    <h2>Billing Information</h2>
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />

                    <label htmlFor="address">Shipping Address</label>
                    <textarea
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows="3"
                        required
                    ></textarea>

                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                    

                    <label htmlFor="zip">ZIP Code</label>
                    <input
                        type="text"
                        id="zip"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        required
                    />

                    <label htmlFor="country">Country</label>
                    <select
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    >
                        <option value="us">United States</option>
                        <option value="ca">Canada</option>
                        <option value="uk">United Kingdom</option>
                        <option value="ng">Nigeria</option>
                        <option value="gh">Ghana</option>
                    </select>
                </div>
                 
                <div className="ship">
                    <div className="shipping-method">
                        <h2>Shipping Method</h2>
                        <div className={`option ${shippingMethod === 'deliver' ? 'selected' : ''}`} onClick={() => setShippingMethod('deliver')}>
                            <input
                                type="radio"
                                id="deliver"
                                name="shipping"
                                value="deliver"
                                checked={shippingMethod === 'deliver'}
                                onChange={(e) => setShippingMethod(e.target.value)}
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
                                onChange={(e) => setShippingMethod(e.target.value)}
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

                <div className="pay">
                    <h2>Payment Information</h2>
                    <div className="payment-method">
                        <div className={`option ${paymentMethod === 'cash' ? 'selected' : ''}`} onClick={() => setPaymentMethod('cash')}>
                            <input
                                type="radio"
                                id="cash"
                                name="payment"
                                value="cash"
                                checked={paymentMethod === 'cash'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="cash">Cash</label>
                        </div>

                        <div className={`option ${paymentMethod === 'transfer' ? 'selected' : ''}`} onClick={() => setPaymentMethod('transfer')}>
                            <input
                                type="radio"
                                id="transfer"
                                name="payment"
                                value="transfer"
                                checked={paymentMethod === 'transfer'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="transfer">Bank Transfer</label>
                        </div>

                        {paymentMethod === 'transfer' && (
                            <div className='transfer-details'>
                                <h4>Bank Transfer Details</h4>
                                <label htmlFor="bank-details">Bank: XYZ Bank, Account Number: 1234567890, Account Name: </label>
                            </div>
                        )}
                    </div>
                </div>

                <div className="summ">
                    <h2>Order Summary</h2>
                    <div className="order-summary">
                        <ul>
                            {cart.map((item, index) => (
                                <li key={item.id || index}>
                                    {item.name} - {formatPrice(parsePrice(item.price) * (item.quantity || 1))} x {item.quantity || 1}
                                </li>
                            ))}
                        </ul>
                        <p><strong>Total Quantity: {orderSummary.totalQuantity}</strong></p>
                        <p><strong>Total Price: {formatPrice(orderSummary.totalPrice)}</strong></p>
                    </div>
                </div>

                <button className='check-btn' type="submit">Complete Purchase</button>
            </form>
        </div>
    );
};

export default Checkout;
