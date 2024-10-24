import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import kleftylogo from './assets/kleftylogo.png'

function Navigation() {
    return (
        <nav className="navbar">
        <ul>
        <img className="kleftylogo" src= {kleftylogo} alt="" />
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/products">SignIn</a></li>
        </ul>
      </nav>
    );
  }; 
    
export default Navigation;