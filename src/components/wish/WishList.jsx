import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { db } from '../../FireBase'; 
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../account/AuthContext'; 
import './WishList.css';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true); 
      if (currentUser) {
        const userDocRef = doc(db, 'Users', currentUser.uid); 
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          setWishlist(userDoc.data().wishlist || []);
        } else {
          console.log("No wishlist found for user.");
        }
      }
      setLoading(false); 
    };

    fetchWishlist();
  }, [currentUser]);

  const handleRemoveFromWishlist = async (productName) => {
    const updatedWishlist = wishlist.filter(product => product.name !== productName);
    setWishlist(updatedWishlist);

    const userDocRef = doc(db, 'Users', currentUser.uid);
    await updateDoc(userDocRef, {
      wishlist: updatedWishlist
    });
  };

  return (
    <div className='wish'>
      <h1>My Wishlist</h1>
      {loading ? (
        <div className="loading-spinner"><img src="/public/spin.gif" alt="" /></div>
      ) : wishlist.length === 0 ? (
        <p>Your wishlist is empty!</p>
      ) : (
        wishlist.map((product) => (
          <Card key={product.name} style={{ width: '18rem', marginBottom: '1rem' }}>
            <Card.Img
              style={{ height: '220px' }}
              variant="top"
              src={product.img || "/images/default.jpg"}
              alt={`Image of ${product.name}`}
            />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>
                 {product.price}
              </Card.Text>
              <Button className='wish-button' variant="primary" onClick={() => handleRemoveFromWishlist(product.name)}>Remove from Wishlist</Button>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default Wishlist;
