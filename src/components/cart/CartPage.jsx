import React, { useState, useEffect } from 'react';

const CartPage = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Load cart items from local storage
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
    }, []);

    // Adjust quantity of an item
    const adjustQuantity = (id, amount) => {
        const updatedCart = cart.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Remove item from cart
    const removeFromCart = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Calculate total price
    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className='cart-page'>
            <h1>Your Cart</h1>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>₦ {item.price}</td>
                            <td>
                                <button onClick={() => adjustQuantity(item.id, -1)}>-</button>
                                {item.quantity}
                                <button onClick={() => adjustQuantity(item.id, 1)}>+</button>
                            </td>
                            <td>₦ {item.price * item.quantity}</td>
                            <td>
                                <button onClick={() => removeFromCart(item.id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Total Price: ₦ {getTotalPrice()}</h2>
        </div>
    );
};

export default CartPage;
