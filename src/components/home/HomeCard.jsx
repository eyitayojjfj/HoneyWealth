import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useState, useEffect } from 'react';


const HomeCard = ({name, img, price, func}) => {
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    // Check if the product is already in the wishlist when the component mounts
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const productInWishlist = wishlist.some(product => product.name === name);
    setIsInWishlist(productInWishlist);
  }, [name]);

  const handleAddToCart = (event) => {
    event.stopPropagation();
    const product = { name, img, price };

    try {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${name} added to cart!`);
    } catch (error) {
      console.error("Failed to add product to cart", error);
    }
  };

  const handleToggleWishlist = (event) => {
    event.stopPropagation();
    const product = { name, img, price };

    try {
      let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      
      if (isInWishlist) {
        // Remove from wishlist
        wishlist = wishlist.filter(item => item.name !== name);
      } else {
        // Add to wishlist
        wishlist.push(product);
      }

      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsInWishlist(!isInWishlist);
    } catch (error) {
      console.error("Failed to update wishlist", error);
    }
  };


return (
    <Card style={{ width: '18rem' }} onClick={func}>
        <Card.Img 
            style={{ height: "220px" }} 
            variant="top" 
            src={img || "/images/212 Men NYC 85k men.jpg"} 
            alt={`Image of ${name}`} 
        />
        <Card.Body>
            <Card.Title>{name}</Card.Title>  
            <p className='stock'>Available</p>
            <Card.Text>
                ₦ {price}
            </Card.Text>
            <Button className='but' variant="primary" onClick={handleAddToCart}>Add To Cart</Button>
            <span><i 
            className={`fa-heart${isInWishlist ? ' fa-solid' : ' fa-regular'}`} 
            style={{ color: isInWishlist ? 'red' : 'gray' }} 
            onClick={handleToggleWishlist}
          ></i></span>
        </Card.Body>
    </Card>
);
};

// Prop types validation




export default HomeCard