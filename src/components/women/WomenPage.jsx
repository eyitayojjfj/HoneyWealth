import React, { useEffect, useState } from 'react';
import WomenCard from './WomenCard';
import { db } from '../../FireBase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import './Women.css';

const WomenPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN', // Set to Naira
    }).format(price);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Women-Products'));
        const productsArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsArray);
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const openProductDetails = (id) => { 
    navigate(`/women-product/${id}`);
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <img src="/spin.gif" alt="Loading..." />
      </div>
    );
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className='fum'>
      <div className='gender'>
        <h1>Women</h1>
        <br />
        <h3>
          Indulge in our array of delicate and enchanting perfumes, <br /> 
          perfect for any occasion.
        </h3>
      </div>
      <div className='product-grid'>
        {products.length > 0 ? (
          products.map((product) => (
            <WomenCard 
              key={product.id}
              img={product.productImage} 
              name={product.productName}
              price={formatPrice(product.productPrice)} // Format the price here
              func={() => openProductDetails(product.id)}
            />
          ))
        ) : (
          <h2>No products available.</h2>
        )}
      </div>
    </div>
  );
}

export default WomenPage;
