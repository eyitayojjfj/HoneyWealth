import React, { useEffect, useState } from 'react';
import { auth, db } from '../../FireBase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const OrderHistory = () => {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                const fetchOrderHistory = async () => {
                    try {
                        const userDocRef = doc(db, 'Users', currentUser.uid);
                        const userDoc = await getDoc(userDocRef);

                        if (userDoc.exists()) {
                            setOrders(userDoc.data().orders || []);
                        } else {
                            console.log('No order data found');
                        }
                    } catch (error) {
                        console.error('Failed to fetch order history:', error);
                    } finally {
                        setLoading(false);
                    }
                };

                fetchOrderHistory();
            } else {
                navigate('/signin');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    if (loading) {
        return <div className="loading-spinner"><img src="/public/spin.gif" alt="" /></div>;
    }
  

    return (
        <div className='side'>
        <div className="sidebar">
        <h3>Profile</h3>
        <ul>
            <li onClick={() => navigate('/account')}>Profile Details</li>
            <li onClick={() => navigate('/order-history')}>Order History</li>
        </ul>
       
    </div>
        <div className="order-history">
             

            <h1>Order History</h1>
            {orders.length > 0 ? (
                <ul>
                    {orders.map((order, index) => (
                        <li key={index}>
                            <div>
                                <h3>Order {index + 1}</h3>
                                <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                                <p><strong>Total Price:</strong> {order.totalPrice}</p>
                                <p><strong>Shipping Method:</strong> {order.shippingMethod}</p>
                                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                                <p><strong>Items:</strong></p>
                                <ul>
                                    {order.cart.map((item, i) => (
                                        <li key={i}>
                                            {item.name} - {item.price} x {item.quantity}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
        </div>
    );
};

export default OrderHistory;
