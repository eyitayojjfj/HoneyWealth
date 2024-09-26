import React, { useEffect, useState } from 'react';
import MenCard from './MenCard';
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../FireBase'; 
import './Men.css';

const MenPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'Men-Products');
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []);

  const openProductDetails = (id) => { 
    console.log("Product ID: ", id);
    navigate(`/men-product/${id}`);
  };

  return (
    <div className='fum'>
      <div className='gender'>
        <h1>Men</h1>
        <h3>
          Dive into our selection of bold, sophisticated scents designed to make a statement.
        </h3>
      </div>

      {loading ? (
        <div className="loading-spinner">
          <img src="/public/spin.gif" alt="Loading..." />
        </div>
      ) : (
        <div className='product-grid'>
          {products.length > 0 ? (
            products.map((product) => (
              <MenCard
                key={product.id} 
                img={product.productImage}
                name={product.productName}
                price={product.productPrice}
                func={() => openProductDetails(product.id)}
              />
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MenPage;
