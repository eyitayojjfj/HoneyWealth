import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { db } from '../../FireBase'; 
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { useAuth } from '../account/AuthContext'; 
import { useNavigate } from 'react-router-dom';

const HomeCard = ({ name, img, price, func }) => {

  const navigate = useNavigate();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { currentUser } = useAuth(); 

  useEffect(() => {
    const checkWishlist = async () => {
      if (currentUser) {
        const userDocRef = doc(db, 'Users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsInWishlist(userData.wishlist?.some(product => product.name === name) || false);
        }
      }
    };

    checkWishlist();
  }, [name, currentUser]);

  const handleAddToCart = async (event) => {
    event.stopPropagation();
    const product = { name, img, price };

    if (currentUser) {
      const userDocRef = doc(db, 'Users', currentUser.uid);
      try {
        await updateDoc(userDocRef, {
          cart: arrayUnion(product),
        });
        alert(`${name} added to cart!`);
      } catch (error) {
        console.error("Failed to add product to cart", error);
      }
    } else {
      navigate('/signin');
    }
  };

  const handleToggleWishlist = async (event) => {
    event.stopPropagation();
    const product = { name, img, price };

    if (currentUser) {
      const userDocRef = doc(db, 'Users', currentUser.uid);
      try {
        if (isInWishlist) {
          await updateDoc(userDocRef, {
            wishlist: arrayRemove(product),
          });
          setIsInWishlist(false);
        } else {
          await updateDoc(userDocRef, {
            wishlist: arrayUnion(product),
          });
          setIsInWishlist(true);
        }
      } catch (error) {
        console.error("Failed to update wishlist", error);
      }
    } else {
      navigate('/signin');
    }
  };

  return (
    <Card className='product-card' onClick={func}>
      <Card.Img 
        className='product-card-img' 
        variant="top" 
        src={img || "/images/212 Men NYC 85k men.jpg"} 
        alt={`Image of ${name}`} 
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <p className='stock'>Available</p>
        <Card.Text>
        <span id='price'>
          {price}
          </span>
          <span id='con'>
            <i 
              className={`fa-heart${isInWishlist ? ' fa-solid' : ' fa-regular'}`} 
              style={{ color: isInWishlist ? 'red' : 'gray' }} 
              onClick={handleToggleWishlist}
            ></i>
          </span>
          <Button className='but' variant="primary" onClick={handleAddToCart}>ADD TO CART</Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

HomeCard.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  func: PropTypes.func.isRequired,
};

export default HomeCard;
