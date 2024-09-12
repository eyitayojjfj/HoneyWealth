import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import female from './womendata'; // Ensure this path is correct
import './ProductDetails.css'; // Import the CSS file

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = female.find(p => p.id === id);
    setProduct(foundProduct || null);
  }, [id]);

  const AddToCart = (event) => {
    event.stopPropagation();
    if (product) {
      const { name, image, price } = product;
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push({ name, image, price });
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${name} added to cart!`);
    }
  };

  if (!product) {
    return <div className="alert">Product not found</div>;
  }

  return (
    <div className="container mt-4">
      <Card className="card" >
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          className="card-img"
        />
        <Card.Body className="card-body">
          <Card.Title className="card-title">{product.name}</Card.Title>
          <Card.Text className="card-text">
            <strong>Price:</strong> ₦ {product.price}
          </Card.Text>
          <Button onClick={AddToCart}>
            Add To Cart
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductDetails;
