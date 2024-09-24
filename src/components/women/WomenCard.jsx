
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useState, useEffect } from 'react';


const WomenCard = ({ name, img, price, func }) => {

  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const productInWishlist = wishlist.some(product => product.name === name);
    setIsInWishlist(productInWishlist);
  }, [name]);

  const handleAddToCart = (event) => {
    event.stopPropagation();
    const product = { name, img, price };

    try {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      
      const productInCart = cart.some(item => item.name === name);
  
      if (productInCart) {
        alert(`${name} is already in the cart!`);
      } else {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${name} added to cart!`);
      }
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
        wishlist = wishlist.filter(item => item.name !== name);
      } else {
        wishlist.push(product);
      }

      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsInWishlist(!isInWishlist);
    } catch (error) {
      console.error("Failed to update wishlist", error);
    }
  };

  const style = {
    height: "220px",
  };

  return (
    <Card className='product-card' onClick={func}>
      <Card.Img className='product-card-img' variant="top" src={img || "/images/Ajiwad 20k female.jpg"} alt={`Image of ${name}`} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <p className='stock'>Available</p>
        <Card.Text>
          ₦ {price}
          <span><i 
            className={`fa-heart${isInWishlist ? ' fa-solid' : ' fa-regular'}`} 
            style={{ color: isInWishlist ? 'red' : 'gray' }} 
            onClick={handleToggleWishlist}
          ></i></span>
          <Button className='but' variant="primary" onClick={handleAddToCart}>DD TO CART</Button>
        
        </Card.Text>
        
      </Card.Body>
    </Card>
  );
}

export default WomenCard;
