import React, { useEffect, useState } from 'react';
import HomeCard from './HomeCard';
import './HomePage.css';
import { GiDelicatePerfume } from "react-icons/gi";
import { IoMdPricetag } from "react-icons/io";
import { MdLockPerson } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { db } from '../../FireBase'; // Adjust the import path as needed
import { collection, getDocs } from 'firebase/firestore';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const openProductDetails = (id) => { 
    console.log("Product ID: ", id);
    navigate(`/homeproduct/${id}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Home-Products'));
        const productsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <section className='section'>
        <h1>Touring You Round The World of Fragrance.</h1>
        <div className='butt'>
          <button className='btn2'><a href="/allproducts">SHOP NOW</a></button>
        </div>
      </section>
      <div className='sec'>
        <div className='sec2'><h1>Explore Our Collection</h1></div>
        <div className='product-grid'>
          {products.map((product) => (
            <HomeCard 
              key={product.id}
              img={product.productImage} 
              name={product.productName}
              price={product.productPrice} 
              func={() => openProductDetails(product.id)} 
            />
          ))}
        </div>

        <div className='container2'>
        <div className='honey'>
            <h1><MdLockPerson /></h1>
            <h5>Secured Payments</h5>
            <p>Your security is our priority. At HoneyWealth Fragrances, we use the latest encryption technology to ensure that all transactions are safe and secure. Shop with confidence knowing that your personal and payment information is protected. Our secure payment options make your shopping experience smooth and worry-free.</p>
          </div>
          <div className='honey'>
            <h1><GiDelicatePerfume /></h1>
            <h5>Best Quality</h5>
            <p>At HoneyWealth Fragrances, we pride ourselves on delivering the finest quality fragrances. Each perfume is crafted using premium ingredients sourced from around the globe, ensuring that every scent embodies purity and sophistication. </p>
          </div>
          <div className='honey'>
            <h1><IoMdPricetag /></h1>
            <h5>Best Offers</h5>
            <p>We believe that exceptional quality should be accessible. That’s why we offer incredible value through exclusive deals and promotions on our premium perfumes. Whether you're indulging in a signature scent or gifting someone special, you can enjoy our high-end fragrances at unbeatable prices. </p>
          </div>
        </div>
        <aside>
          <h3>Experience the HoneyWealth Fragrances Difference</h3>
          <p>Explore our collection and find your perfect scent today. For any inquiries or assistance, our friendly customer service team <br /> is here to help. Contact us at [+234 704 819 8913] or [ honeywealth.fragrances@gmail.com], or visit us at [CITS University Of Lagos]</p>
        </aside>
      </div>
    </div>
  );
}

export default HomePage;
