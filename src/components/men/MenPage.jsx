import React from 'react'
import MenCard from './MenCard'
import { useNavigate } from "react-router-dom";
import perfumes from './mendata';



const MenPage = () => {

  const style = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr ",
    gap: "25px",
   
     paddingLeft: "90px"
   
}
const navigate = useNavigate();

// handle open product details
const openProductDetails = (id) => { 
  console.log("Product ID: ", id);
  // navigate to product details page
  navigate(`/product/${id}`);
};



  // const perfumes =[
  //   {"id": "001", "name": "212 Men NYC", "image": "/images/212 Men NYC 85k men.jpg ",  "price": 85000},
  //   {"id": "004", "name": "Amber Black", "image": "/images/Amber black 6k men.jpg",  "price": 6000},
  //   {"id": "005", "name": "Amber Blue", "image": "/images/Amber Blue 6k masc.jpg", "price": 6000},
  //   {"id": "007", "name": "Amberley Pur OUD", "image": "/images/Amberley Pur oud 45k men.jpg",  "price": 45000},
  //   {"id": "008", "name": "Amourage Set", "image": "/images/AMourage Set 10k Men.jpg",  "price": 10000},
  //   {"id": "010", "name": "Asad", "image": "/images/Asad 29k men.jpg",  "price": 29000},
  //   {"id": "011", "name": "Asad zanzebar", "image": "/images/Asad zanzebar 21k men.jpg", "price": 21000},
  //   {"id": "016", "name": "Clive Doris", "image": "/images/Clive Doris 10k male.jpg", "price": 10000},
  //   {"id": "019", "name": "Greatness Noir", "image":  "/images/Greatness Noir 2 7k men.jpg",  "price": 7000},
  //   {"id": "020", "name": "Greatness Noir", "image":  "/images/Greatness Noir 7k men.jpg", "price": 7000},
  //   {"id": "031", "name": "jo Malone", "image": "public/images/Jo malone 300k men.jpg",  "price": 300000},
  //   {"id": "032", "name": "Lataffa Al Ameed", "image": "public/images/Lataffa Al Ameed 27k men.jpg", "price": 27000},
  //   {"id": "034", "name": "lataffa Bade'e Al OUD", "image": "public/images/Lataffe Bade'e Al Oud 30k men.jpg ",  "price": 30000},
  //   {"id": "037", "name": "Monsieur", "image": "public/images/Monsieur 16.5k men.jpg ",  "price": 16500},
  //   {"id": "038", "name": "Mousuf Combo", "image": "public/images/Mousuf Combo 21k men.jpg ",  "price": 21000},
  //   {"id": "039", "name": "Mousuf Lataffa", "image": "public/images/Mousuf Lataffa 18k .jpg ",  "price": 18000},
  //   {"id": "040", "name": "Mousuf Ramadi", "image": "public/images/Mousuf Ramadi 17k men.jpg ",  "price": 17000},
  //   {"id": "047", "name": "NOW", "image": "public/images/NOW 27k men.jpg",  "price": 27000},
  //   {"id": "058", "name": "Supremacy In OUD", "image": "public/images/Supremacy In OUD 300k men.jpg ",  "price": 300000},
  //   {"id": "059", "name": "Suspenso Combo", "image": "public/images/suspenso Combo 15k men.jpg ",  "price": 15000},
  //   {"id": "060", "name": "Tabac", "image": "public/images/Tabac 20k men.jpg ",  "price": 20000},
  //   {"id": "061", "name": "Tom Ford Ombre Leather", "image": "public/images/Tom Ford Ombre Leather 250k men.jpg",  "price": 250000},
  //   {"id": "068", "name": "Zara Set", "image": "public/images/Zara set2 25k men.jpg",  "price": 25000},
          

  // ]

  return (
    <div className='fum'>
      <div className='gender'><h1>Men</h1><br /><h3>Dive into our selection of bold, sophisticated scents <br /> designed to make a statement.
      </h3></div>
    <div style={style}>
         {perfumes.map((product) => (
          <MenCard img={product.image} name={product.name}
           price={product.price} func={() => openProductDetails(product.id)}/>
         ))}
         </div>
         </div>
  )
}

export default MenPage