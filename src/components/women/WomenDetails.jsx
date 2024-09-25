import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { db } from '../../FireBase'; // Update with your Firestore config
import { doc, getDoc } from 'firebase/firestore';
import '../allproducts/Products.css';

const WomenDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, 'Women-Products', id); 
        const productSnap = await getDoc(productRef);
        
        if (productSnap.exists()) {
          setProduct({ id: productSnap.id, ...productSnap.data() });
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        setError("Error fetching product data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const AddToCart = (event) => {
    event.stopPropagation();
    if (product) {
      const { productName, productImage, productPrice } = product;
      
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      
      const isProductInCart = cart.some(item => item.name === productName);
  
      if (!isProductInCart) {
        cart.push({ name: productName, img: productImage, price: productPrice });
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${productName} added to cart!`);
      } else {
        alert(`${productName} is already in the cart!`);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        {error} <Link to="/">Go back to products</Link>
      </div>
    );
  }

  return (
    <div id='detail' className="container mt-4">
      <h1>Product Details</h1>
      <Card className="card">
        <Card.Img
          variant="top"
          src={product.productImage}
          alt={product.productName}
          className="card-img"
        />
        <Card.Body className="card-body">
          <Card.Title className="card-title">{product.productName}</Card.Title>
          <Card.Text className="card-text">
            <strong>Price:</strong> ₦ {product.productPrice}
          </Card.Text>
          <Button className='detail-button' onClick={AddToCart}>
            Add To Cart
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default WomenDetails;
