import React from 'react'
import HomeCard from './HomeCard'
import './HomePage.css'
import { GiDelicatePerfume } from "react-icons/gi";
import { IoMdPricetag } from "react-icons/io";
import { MdLockPerson } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import homer from './homedata';




const HomePage = () => {

  const navigate = useNavigate();

  // handle open product details
  const openProductDetails = (id) => { 
    console.log("Product ID: ", id);
    // navigate to product details page
    navigate(`/product/${id}`);
  };
  


  const container = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr ",
    gap: "10px",
    paddingLeft: "90px",
    paddingRight: "90px",
    paddingTop: "90px",
    
  }

  
// const homer = [
//   {"id": "001", "name": "212 Men NYC", "image": "/images/212 Men NYC 85k men.jpg ",  "price": 85000},
//   {"id": "002", "name": "Ajiwad ", "image": "/images/Ajiwad 20k female.jpg",  "price": 20000},
//   {"id": "003", "name": "Amber", "image": "/images/Amber 6k unisex.jpg", "price": 6000},
//   {"id": "004", "name": "Amber Black", "image": "/images/Amber black 6k men.jpg",  "price": 6000},
//   {"id": "005", "name": "Amber Blue", "image": "/images/Amber Blue 6k masc.jpg", "price": 6000},
//   {"id": "006", "name": "Amber Red", "image": "/images/Amber red 6k female.jpg", "price": 16000},
//   {"id": "007", "name": "Amberley Pur OUD", "image": "/images/Amberley Pur oud 45k men.jpg",  "price": 45000},
//   {"id": "008", "name": "Amourage Set", "image": "/images/AMourage Set 10k Men.jpg",  "price": 10000},
//   {"id": "009", "name": "Armani", "image": "/images/armani 10k unisex.jpg",  "price": 10000},
//   {"id": "010", "name": "Asad", "image": "/images/Asad 29k men.jpg",  "price": 29000},
//   {"id": "011", "name": "Asad zanzebar", "image": "/images/Asad zanzebar 21k men.jpg", "price": 21000},
//   {"id": "012", "name": "Baby Love Mist", "image": "/images/Baby LOve Mist 2.5k kids.jpg",  "price": 2500},
// ]
  return (
    <div>
    <div>
     <section className='section'>
    <h1>Discover a world <br /> of luxury scents <br /> tailored just for you.</h1>

    <div className='butt' ><button  className='btn2'><a href="/allproducts">SHOP NOW</a></button></div>
     {/* <div><img className='logo' src="/public/images/HoneyWealth.jpg" alt="" /></div>  */}
    </section>
    <div className='sec'>
    <div className='sec2'><h1>Explore Our Collection</h1></div>
    <div className='container' >
     
         {homer.map((product) => (
          <HomeCard img={product.image} name={product.name}
           price={product.price} func={() => openProductDetails(product.id)}  />
         ))}
       
         </div>

         <div className='container2' >
          <div className='honey'><h1><GiDelicatePerfume /></h1>
          <h5>Best Quality</h5>
          <p>At HoneyWealth Fragrances, we pride ourselves on delivering the finest quality fragrances. Each perfume is crafted using premium ingredients sourced from around the globe, ensuring that every scent embodies purity and sophistication. </p>
          </div>

          <div className='honey'><h1><IoMdPricetag /></h1>
          <h5>Best Offers</h5>
          <p>We believe that exceptional quality should be accessible. That’s why we offer incredible value through exclusive deals and promotions on our premium perfumes. Whether you're indulging in a signature scent or gifting someone special, you can enjoy our high-end fragrances at unbeatable prices. </p>
          </div>

          <div className='honey'><h1><MdLockPerson /></h1>
          <h5>Secured Payments</h5>
          <p>Your security is our priority. At [Your Perfume Business Name], we use the latest encryption technology to ensure that all transactions are safe and secure. Shop with confidence knowing that your personal and payment information is protected. Our secure payment options make your shopping experience smooth and worry-free.</p>
          </div>
          
         </div>
         <aside>
          <h3>Experience the HoneyWealth Fragrances Difference</h3>
          <p>Explore our collection and find your perfect scent today. For any inquiries or assistance, our friendly customer service team <br /> is here to help. Contact us at [phone number] or [email address], or visit us at [address].</p>
         </aside>
    </div>
    
    </div>
    
   
  </div>
  )
}

export default HomePage