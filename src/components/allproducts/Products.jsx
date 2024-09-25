import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useNavigate } from "react-router-dom";
import { db } from '../../FireBase';
import { collection, getDocs } from 'firebase/firestore';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const productsCollection = collection(db, 'Products');
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openProductDetails = (id) => { 
    navigate(`/product/${id}`);
  };

  return (
    <div className='fum'>
      <div className='scoot'>
        <h1>Browse our full range of fragrances</h1>
      </div>

      {loading ? (
        <div className="loading-spinner">
          <img src="/spin.gif" alt="Loading..." />
        </div>
      ) : (
        <div className='product-grid'>
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              img={product.productImage} 
              name={product.productName} 
              price={product.productPrice} 
              func={() => openProductDetails(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
