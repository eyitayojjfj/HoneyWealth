import React, { useEffect, useState } from 'react';
import { useParams, } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import female from './womendata';
const WomenDetails = () => {
  const style ={
    height: "220px",
}


  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
 

  useEffect(() => {
   
    const foundProduct = female.find((p) => p.id === id);
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
          <Button variant="primary" >
            Add To Cart
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};



export default WomenDetails;
