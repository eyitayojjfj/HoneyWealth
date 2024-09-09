import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Navigation from './components/header/Navigation';
import HomePage from './components/home/HomePage';
import Products from './components/allproducts/Products';
import MenPage from './components/men/MenPage';
import WomenPage from './components/women/WomenPage';
import CartPage from './components/cart/CartPage';
import WishList from './components/wish/WishList';
import SignIn from './components/signin/SignIn';
import SignUp from './components/signup/SignUp';
import Error from './components/error404/Error';
import Footer from './components/footer/Footer';
import ContactPage from './components/contact/ContactPage';
import TermsPage from './components/terms/TermsPage';
import AboutPage from './components/about/AboutPage';
import PrivacyPolicy from './components/privacy/PrivacyPolicy';
import ProductDetails from './components/allproducts/ProductDetails';
import Checkout from './components/checkout/Checkout';

function App() {
  return (

      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/allproducts" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/men" element={<MenPage />} />
          <Route path="/women" element={<WomenPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wish" element={<WishList />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </div>
   
  );
}

export default App;
