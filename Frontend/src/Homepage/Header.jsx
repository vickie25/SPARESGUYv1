import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './HomepageCSS/Header.css';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="w-100">
      <Navbar.Brand href="#home">SpareParts</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#about">About Us</Nav.Link>
          <Nav.Link href="#shop">Shop</Nav.Link>
          <Nav.Link href="#contact">Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;