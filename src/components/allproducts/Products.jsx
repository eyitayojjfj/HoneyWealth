import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useNavigate } from "react-router-dom";
import { db } from '../../FireBase';
import { collection, getDocs } from 'firebase/firestore';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(price);
  };

  const fetchProducts = async () => {
    try {
      const productsCollection = collection(db, 'Products');
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again later."); 
    } finally {
      setLoading(false);
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
        <div className="loading-spinner" aria-live="polite">
          <img src="/spin.gif" alt="Loading..." />
        </div>
      ) : error ? (
        <p className="error-message">{error}</p> 
      ) : products.length > 0 ? (
        <div className='product-grid'>
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              img={product.productImage} 
              name={product.productName} 
              price={formatPrice(product.productPrice)} 
              func={() => openProductDetails(product.id)}
            />
          ))}
        </div>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
}

export default Products;
