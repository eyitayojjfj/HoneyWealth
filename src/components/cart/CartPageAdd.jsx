import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from "react-icons/fa";
import { db } from '../../FireBase'; 
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../account/AuthContext'; 
import './CartPage.css';

const CartPageAdd = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { currentUser } = useAuth(); 

    useEffect(() => {
        const fetchCartItems = async () => {
            if (currentUser) {
                setLoading(true);
                try {
                    const userCartRef = doc(db, 'Users', currentUser.uid);
                    const userCartSnapshot = await getDoc(userCartRef);
                    
                    if (userCartSnapshot.exists()) {
                        setCart(userCartSnapshot.data().cart || []);
                    } else {
                        console.log("No cart found for user.");
                    }
                } catch (error) {
                    console.error('Error fetching cart items:', error);
                    setError("Failed to load cart items. Please try again later.");
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [currentUser]);

    const handleQuantityChange = async (index, delta) => {
        const updatedCart = [...cart];
        const newQuantity = Math.max(0, (updatedCart[index].quantity || 0) + delta);
        updatedCart[index].quantity = newQuantity;
        setCart(updatedCart);

        const userCartRef = doc(db, 'Users', currentUser.uid);
        await updateDoc(userCartRef, { cart: updatedCart });
    };

    const handleRemove = async (index) => {
        if (currentUser) {
            const updatedCart = cart.filter((_, i) => i !== index);
            setCart(updatedCart);

            const userCartRef = doc(db, 'Users', currentUser.uid);
            await updateDoc(userCartRef, { cart: updatedCart });
        }
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
            const price = parsePrice(item.price);
            const quantity = item.quantity || 1;
            return total + (price * quantity);
        }, 0).toFixed(2);
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    if (loading) {
        return <div className="loading-spinner" aria-live="polite"><img src="/public/spin.gif" alt="Loading..." /></div>;
    }

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            {error && <p className="error-message">{error}</p>}
            {cart.length === 0 ? (
                <p>Your cart is empty!</p>
            ) : (
                <div>
                    <ul>
                        {cart.map((item, index) => {
                            const price = parsePrice(item.price);
                            return (
                                <li key={item.id || index} className="cart-item">
                                    <img src={item.img || 'default-image.png'} alt={`Image of ${item.name}`} />
                                    <div className="cart-item-info">
                                        <h3>{item.name}</h3>
                                        <p>{formatPrice(price)}</p> 
                                        <p>Available</p>
                                        <div className="quantity-controls">
                                            <button 
                                                className='btn3' 
                                                onClick={() => handleQuantityChange(index, -1)} 
                                                disabled={item.quantity == 1}
                                                aria-label={`Decrease quantity of ${item.name}`}
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity || 1}</span>
                                            <button 
                                                className='btn3' 
                                                onClick={() => handleQuantityChange(index, 1)}
                                                aria-label={`Increase quantity of ${item.name}`}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className='remove'>
                                        <button 
                                            className='btn4' 
                                            onClick={() => handleRemove(index)}
                                            aria-label={`Remove ${item.name} from cart`}
                                        >
                                            <FaRegTrashAlt /> Remove
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="cart-total">
                        <h2>Sub Total: {formatPrice(calculateTotalPrice())}</h2> 
                    </div>
                    <div className="cart-checkout">
                        <button className='btn5' onClick={handleCheckout}>Checkout ( {formatPrice(calculateTotalPrice())} )</button>
                    </div>
                </div>
            )}
            <Link className='bck' to="/allproducts">Back to Products</Link>
        </div>
    );
};

export default CartPageAdd;
