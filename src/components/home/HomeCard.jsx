import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const HomeCard = ({name, img, price}) => {
  const style ={
       height: "220px",
}

  return (
    <Card style={{ width: '18rem',  }}>
    <Card.Img style={style} variant="top" src={img || "/images/212 Men NYC 85k men.jpg "} />
    <Card.Body>
   
      <Card.Title>{name}</Card.Title>  <p className='stock'>Available</p>
      <Card.Text>
      ₦ {price}
      </Card.Text>
      <Button className='but' variant="primary">Add To Cart</Button>
      <span><i class="fa-regular fa-heart"></i></span>
    </Card.Body>
  </Card>
  )
}

export default HomeCard