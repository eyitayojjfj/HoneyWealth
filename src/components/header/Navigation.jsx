import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const Navigation = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="cont">
    <Container >
      <Navbar.Brand href="/" className='head'><img src="/images/lg.jpg" width="70px" height="50px" alt="" /></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/allproducts" className='head2'>ALL PRODUCTS</Nav.Link>
          <Nav.Link href="/men" className='head2'>MEN</Nav.Link>
          <Nav.Link href="/women" className='head2'>WOMEN</Nav.Link>
        
        </Nav>
        <Nav>
          <Nav.Link href="/cart"><i  class="fa-solid fa-cart-shopping">0 </i></Nav.Link>
          <NavDropdown title="ACCOUNT" id="collapsible-nav-dropdown" className='head2'>
            <i class="fa-solid fa-user"></i ><NavDropdown.Item className='drop' href="/signin"><button className='btn'>LOG IN</button></NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item className='drop2' href="#action/3.2">
              MY ACCOUNT
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item className='drop2' href="/wish">WISH LIST</NavDropdown.Item>
           
           
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
  
}

export default Navigation