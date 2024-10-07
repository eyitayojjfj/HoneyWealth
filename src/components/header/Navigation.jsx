import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaUser } from 'react-icons/fa';
import { auth, db } from '../../FireBase'; 
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { RiMenu2Line } from "react-icons/ri";
import { IoCloseOutline } from 'react-icons/io5';
import './Navigation.css'; 

const Navigation = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [userData, setUserData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const userDocRef = doc(db, 'Users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
          
          const unsubscribeCart = onSnapshot(userDocRef, (doc) => {
            if (doc.exists()) {
              const cart = doc.data().cart || [];
              setCartCount(cart.length);
            } else {
              setCartCount(0);
            }
          });

          return () => unsubscribeCart(); 
        } else {
          setUserData(null); 
        }
      } else {
        setUserData(null);
        setCartCount(0);
      }
    });

    return () => unsubscribe(); 
  }, []);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleDropdownToggle = (isOpen) => {
    setDropdownOpen(isOpen);
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="cont fixed-top" expanded={!isCollapsed}>
      <Container>
        <Navbar.Brand href="/" className='head'>
          <img src="/images/lg.jpg" width="70px" height="50px" alt="Logo" />
        </Navbar.Brand>

        {isCollapsed ? (
          <RiMenu2Line
            aria-controls="responsive-navbar-nav"
            className='menu d-lg-none'
            onClick={handleToggle}
            role="button"
            aria-expanded={!isCollapsed}
          />
        ) : (
          <IoCloseOutline
            aria-controls="responsive-navbar-nav"
            className='close d-lg-none'
            onClick={handleToggle}
            role="button"
            aria-expanded={!isCollapsed}
          />
        )}

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/allproducts" className='head2'>ALL PRODUCTS</Nav.Link>
            <Nav.Link href="/men" className='head2'>MEN</Nav.Link>
            <Nav.Link href="/women" className='head2'>WOMEN</Nav.Link>
          </Nav>
          <Nav>
            {userData ? (
              <div>
                <a href='/account'>
                  <img 
                    src={userData.photo || '/default-profile.png'}  
                    className="profile-pic" 
                    alt="Profile"
                  />
                </a>
              </div>
            ) : (
              <div className='faue'><FaUser/></div>
            )}
            <NavDropdown
              title="ACCOUNT"
              id="collapsible-nav-dropdown"
              className='head3'
              show={dropdownOpen}
              onMouseEnter={() => handleDropdownToggle(true)} 
              onMouseLeave={() => handleDropdownToggle(false)} 
            >
              <NavDropdown.Item className='drop' href="/signin">
                <button className='login-btn'>LOG IN</button>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className='drop2' href="/account">
                MY ACCOUNT
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className='drop2' href="/wish">
                WISH LIST
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Nav.Link className='crt' href="/cart">
          <span className='cart'>
            <i className="fa-solid fa-cart-shopping">
              {cartCount > 0 && <span className="item-count">{cartCount}</span>}
            </i>
          </span>
        </Nav.Link>
      </Container>
    </Navbar>
  );
}

export default Navigation;
