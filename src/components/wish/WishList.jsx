import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './WishList.css'

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Load wishlist from localStorage
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  const handleRemoveFromWishlist = (productName) => {
    // Remove the product from the wishlist
    const updatedWishlist = wishlist.filter(product => product.name !== productName);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
  };

  return (
    <div className='wish'>
      <h1>My Wishlist</h1>
      {wishlist.length === 0 ? (
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
                ₦ {product.price}
              </Card.Text>
              <Button variant="primary" onClick={() => handleRemoveFromWishlist(product.name)}>Remove from Wishlist</Button>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default Wishlist;
