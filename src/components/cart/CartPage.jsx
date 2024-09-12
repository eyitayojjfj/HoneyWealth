import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from "react-icons/fa";
import './CartPage.css'; // Assuming you have a CSS file for styles

const CartPage = () => {
    const [cart, setCart] = useState([]);

    
  

    useEffect(() => {
        try {
            // Load cart items from localStorage
            const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
            setCart(savedCart);
        } catch (error) {
            console.error('Failed to load cart from localStorage:', error);
        }
    }, []);

    const handleQuantityChange = (index, delta) => {
        const updatedCart = [...cart];
        const newQuantity = Math.max(1, (updatedCart[index].quantity || 1) + delta);
        updatedCart[index].quantity = newQuantity;
        setCart(updatedCart);
        try {
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        } catch (error) {
            console.error('Failed to update cart in localStorage:', error);
        }
    };

    const handleRemove = (index) => {
        if (window.confirm('Are you sure you want to remove this item from your cart?')) {
            try {
                // Remove item from cart and update localStorage
                const updatedCart = cart.filter((_, i) => i !== index);
                setCart(updatedCart);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            } catch (error) {
                console.error('Failed to update cart in localStorage:', error);
            }
        }
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = item.quantity || 1;
            return total + (price * quantity);
        }, 0).toFixed(2);
    };


    const navigate = useNavigate();
    const handleCheckout = () => {
      // Navigate to checkout page
      navigate('/checkout');
  };


    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty!</p>
            ) : (
                <div>
                    <ul>
                        {cart.map((item, index) => {
                            const price = parseFloat(item.price) || 0;
                            const quantity = item.quantity || 1;
                            return (
                                <li key={item.id || index} className="cart-item">
                                    <img src={item.img || 'default-image.png'} alt={`Image of ${item.name}`} />
                                    <div className="cart-item-info">
                                        <h3>{item.name}</h3>
                                        <p>₦ {price.toFixed(2)}</p>
                                        <p>Available</p>
                                        <div className="quantity-controls">
                                            <button className='btn3' onClick={() => handleQuantityChange(index, -1)} disabled={quantity <= 1}>-</button>
                                            <span>{quantity}</span>
                                            <button className='btn3' onClick={() => handleQuantityChange(index, 1)}>+</button>
                                        </div >
                                       
                                    </div>
                                    <div className='remove'>
                                        <button className='btn4' onClick={() => handleRemove(index)}><FaRegTrashAlt /> Remove</button>
                                        </div>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="cart-total">
                        <h2>Total Price: ₦ {calculateTotalPrice()}</h2>
                    </div>
                    <div className="cart-checkout">
                        <button  className='btn5' onClick={handleCheckout}>Checkout  (₦ {calculateTotalPrice()})</button>
                    </div>
                </div>
            )}
            <Link className='bck' to="/allproducts">Back to Products</Link>
        </div>
    );
};

export default CartPage;
