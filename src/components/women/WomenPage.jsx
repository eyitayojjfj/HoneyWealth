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

  // Loading Spinner
  if (loading) {
    return (
      <div className="loading-spinner">
        <img src="/spin.gif" alt="Loading..." />
      </div>
    );
  }

  // Error Message
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
              price={product.productPrice} 
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
