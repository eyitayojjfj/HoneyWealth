import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaUser } from 'react-icons/fa';
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from 'react-icons/io5';
import { getCartItemCount } from './cartUtils'; // Import the utility function
import './Navigation.css'; // Import your custom CSS file

const Navigation = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    // Update cart count on component mount
    setCartCount(getCartItemCount());

    // Optionally, add an event listener if cart can be updated without a full page refresh
    const updateCartCount = () => setCartCount(getCartItemCount());
    window.addEventListener('storage', updateCartCount);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  return (
    <Navbar collapseOnSelect expand="lg" className="cont" expanded={!isCollapsed}>
      <Container>
        <Navbar.Brand href="/" className='head'>
          <img src="/images/lg.jpg" width="70px" height="50px" alt="Logo" />
        </Navbar.Brand>

        {isCollapsed ? (
          <CiMenuBurger
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
            <FaUser id='user' />
            <NavDropdown title="ACCOUNT" id="collapsible-nav-dropdown" className='head3'>
              <NavDropdown.Item className='drop' href="/signin">
                <button className='btn'>LOG IN</button>
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
            <i className="fa-solid fa-cart-shopping">{cartCount > 0 && <span className="item-count">{cartCount}</span>}</i>
          </span>
        </Nav.Link>
      </Container>
    </Navbar>
  );
}

export default Navigation;
