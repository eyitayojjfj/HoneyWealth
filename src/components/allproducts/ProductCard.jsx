import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { db } from '../../FireBase'; 
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { useAuth } from '../account/AuthContext'; 
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ name, img, price, func }) => {
  const navigate = useNavigate();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { currentUser } = useAuth(); 
  const cardRef = useRef(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    });

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const handleAddToCart = async (event) => {
    event.stopPropagation();
    const product = { name, img, price };

    if (currentUser) {
      const userDocRef = doc(db, 'Users', currentUser.uid);
      try {
        await updateDoc(userDocRef, {
          cart: arrayUnion(product),
        });
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
    <Card className={`product-card ${isVisible ? 'fade-in' : ''}`} onClick={func} ref={cardRef}>
      <Card.Img 
        className='product-card-img'
        variant="top" 
        src={img || "/images/default.jpg"} 
        alt={`Image of ${name}`} 
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>  
        <p className='stock'>Available</p>
        <Card.Text>
          <span id='price'>{price}</span>
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

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string,
  price: PropTypes.number.isRequired,
  func: PropTypes.func.isRequired
};

export default ProductCard;
