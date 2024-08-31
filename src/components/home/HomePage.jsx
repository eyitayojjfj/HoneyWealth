import React from 'react'
import HomeCard from './HomeCard'




const HomePage = () => {
  const style = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr ",
    gap: "25px",
    paddingLeft: "60px",
    
}
  
const homer = [
  {"id": "001", "name": "212 Men NYC", "image": "/images/212 Men NYC 85k men.jpg ",  "price": 85000},
  {"id": "002", "name": "Ajiwad ", "image": "/images/Ajiwad 20k female.jpg",  "price": 20000},
  {"id": "003", "name": "Amber", "image": "/images/Amber 6k unisex.jpg", "price": 6000},
  {"id": "004", "name": "Amber Black", "image": "/images/Amber black 6k men.jpg",  "price": 6000},
  {"id": "005", "name": "Amber Blue", "image": "/images/Amber Blue 6k masc.jpg", "price": 6000},
  {"id": "006", "name": "Amber Red", "image": "/images/Amber red 6k female.jpg", "price": 16000},
  {"id": "007", "name": "Amberley Pur OUD", "image": "/images/Amberley Pur oud 45k men.jpg",  "price": 45000},
  {"id": "008", "name": "Amourage Set", "image": "/images/AMourage Set 10k Men.jpg",  "price": 10000},
  {"id": "009", "name": "Armani", "image": "/images/armani 10k unisex.jpg",  "price": 10000},
  {"id": "010", "name": "Asad", "image": "/images/Asad 29k men.jpg",  "price": 29000},
  {"id": "011", "name": "Asad zanzebar", "image": "/images/Asad zanzebar 21k men.jpg", "price": 21000},
  {"id": "012", "name": "Baby Love Mist", "image": "/images/Baby LOve Mist 2.5k kids.jpg",  "price": 2500},
  {"id": "013", "name": "Bakkarat Rouge", "image": "/images/Bakkarrat Rouge 19k unisex.jpg", "price": 19000},
  {"id": "014", "name": "Body Mist", "image": "/images/Body Mist 3k fem.jpg", "price": 3000},
  {"id": "015", "name": "Body Mist", "image": "/images/Body Mist2 2k female.jpg",  "price": 2000},
  {"id": "016", "name": "Clive Doris", "image": "/images/Clive Doris 10k male.jpg", "price": 10000},
  {"id": "017", "name": "Dimmah", "image": "/images/Dimmah 21.5k unisex.jpg",  "price": 21500},
  {"id": "018", "name": "E'CLAT", "image": "/images/E'CLAT 50k female.jpg",  "price": 50000},
  {"id": "019", "name": "Greatness Noir", "image":  "/images/Greatness Noir 2 7k men.jpg",  "price": 7000},
  {"id": "020", "name": "Greatness Noir", "image":  "/images/Greatness Noir 7k men.jpg", "price": 7000},
]
  return (
    <div>
    <div>
     <section>
    <h1>Discover a world of luxury scents <br /> tailored just for you.</h1>

    <div ><button  className='btn2'><a href="/allproducts">SHOP NOW</a></button></div>
     {/* <div><img className='logo' src="/public/images/HoneyWealth.jpg" alt="" /></div>  */}
    </section>
    <div className='sec'>
    <div className='sec2'><h1>Explore Our Collection</h1></div>
    <div className='container' style={style}>
     
         {homer.map((product) => (
          <HomeCard img={product.image} name={product.name}
           price={product.price}/>
         ))}
       
         </div>
    </div>
    
    </div>
    
   
  </div>
  )
}

export default HomePage