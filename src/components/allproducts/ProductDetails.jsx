import React, { useEffect, useState } from 'react';
import { useParams, } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import perfumes from '../../../productdata'; 

const ProductDetails = ({name, image, price,}) => {
  const AddToCart = (event) => {

    event.stopPropagation();
        const product = {name, image, price };

        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        cart.push(product);

        localStorage.setItem('cart', JSON.stringify(cart));

        alert(`${name} added to cart!`);
    };



  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
   
    const foundProduct = perfumes.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      setProduct(null); 
    }
  }, [id]);

  if (!product) {
    return <div>Product not found</div>; 
  }

  
  

  return (
    <div className="container mt-4">
      <Card style={{ width: '980px', height: '700px',  margin: 'auto' }}>
        <Card.Img
          variant="top"
          src={product.image  }
          alt='image'
          style={{ height: '280px', width: '380px'}}
        />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>
            <strong>Price:</strong> ₦ {product.price}
          </Card.Text>
          <Button variant="primary" onClick={AddToCart}>
            Add To Cart
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

// PropTypes validation for local data
ProductDetails.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number,
  }),
};

export default ProductDetails;
