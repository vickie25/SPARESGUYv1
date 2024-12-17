import React, { useState, useContext } from 'react';
import {
  Navbar,
  Nav,
  Container,
  Form,
  InputGroup,
  Badge,
  Button,
  Offcanvas
} from 'react-bootstrap';
import { FaBars, FaRegHeart, FaRegUser, FaSearch } from 'react-icons/fa';
import { BsCart3 } from 'react-icons/bs';
import { MdOutlineNotificationsNone } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { SearchContext } from '../context/SearchContext';
import CartDropdown from '../Pages/CartDropdown';

const Header = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleWishlistClick = () => {
    navigate('/UserProf', { state: { section: 'wishlist' } });
  };

  const handleNotificationsClick = () => {
    navigate('/UserProf', { state: { section: 'notifications' } });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (isDropdownVisible && !event.target.closest('.cart-dropdown')) {
      setIsDropdownVisible(false);
    }
  };

  // Attach event listener for clicks outside
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownVisible]);

  return (
    <>
      {/* Add a placeholder div to prevent content jump */}
      <div style={{ height: '70px' }}></div>

      <Navbar
        expand="lg"
        className="shadow-sm"
        style={{
          backgroundColor: '#000000',
          minHeight: '70px',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1050
        }}
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4" style={{ color: '#FFFFFF' }}>
            LOGO
          </Navbar.Brand>

          <div className="d-flex align-items-center gap-3 d-lg-none">
            <Button
              variant="link"
              className="position-relative p-1"
              onClick={toggleDropdown}
              style={{ color: '#FFFFFF' }}
            >
              <BsCart3 size={22} />
              {cart.length > 0 && (
                <Badge
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle rounded-circle"
                >
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </Badge>
              )}
            </Button>
            <Navbar.Toggle
              aria-controls="offcanvasNavbar"
              onClick={() => setShowOffcanvas(true)}
              className="border-0"
              style={{ color: '#FFFFFF' }}
            >
              <FaBars size={22} />
            </Navbar.Toggle>
          </div>

          <Navbar.Offcanvas
            show={showOffcanvas}
            onHide={() => setShowOffcanvas(false)}
            placement="end"
            id="offcanvasNavbar"
            style={{ backgroundColor: '#000000', color: '#FFFFFF' }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title style={{ color: '#DAA520' }}>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-center flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/" className="mx-2" style={{ color: '#FFFFFF' }}>Home</Nav.Link>
                <Nav.Link as={Link} to="/shop" className="mx-2" style={{ color: '#FFFFFF' }}>Shop</Nav.Link>
                <Nav.Link as={Link} to="/AboutUs" className="mx-2" style={{ color: '#FFFFFF' }}>About</Nav.Link>
                <Nav.Link as={Link} to="/ContactUs" className="mx-2" style={{ color: '#FFFFFF' }}>Contact</Nav.Link>
              </Nav>

              <div className="d-flex align-items-center justify-content-center my-3">
                <InputGroup className="w-auto">
                  <Form.Control
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearch}
                    style={{ border: '1px solid #DAA520', backgroundColor: '#FFFFFF' }}
                    className="border-end-0"
                  />
                  <Button
                    variant="outline-secondary"
                    style={{ border: '1px solid #DAA520', color: '#DAA520' }}
                    className="border-start-0"
                  >
                    <FaSearch />
                  </Button>
                </InputGroup>
              </div>

              <Nav className="justify-content-end align-items-center gap-3">
                {/* Your navigation items remain the same */}
                <Button
                  variant="link"
                  className="p-1"
                  onClick={handleWishlistClick}
                  style={{ color: '#FFFFFF' }}
                >
                  <FaRegHeart size={22} />
                </Button>

                {/* Cart button with dropdown */}
                <div className="position-relative d-none d-lg-block">
                  <Button
                    variant="link"
                    className="position-relative p-1"
                    onClick={toggleDropdown}
                    style={{ color: '#FFFFFF' }}
                  >
                    <BsCart3 size={22} />
                    {cart.length > 0 && (
                      <Badge
                        bg="danger"
                        className="position-absolute top-0 start-100 translate-middle rounded-circle"
                      >
                        {cart.reduce((total, item) => total + item.quantity, 0)}
                      </Badge>
                    )}
                  </Button>
                  {isDropdownVisible && (
                    <div className="cart-dropdown">
                      <CartDropdown isDropdownVisible={isDropdownVisible} toggleDropdown={toggleDropdown} />
                    </div>
                  )}
                </div>

                {/* Notification and Profile buttons */}
                <Button
                  variant="link"
                  className="p-1"
                  onClick={handleNotificationsClick}
                  style={{ color: '#FFFFFF' }}
                >
                  <MdOutlineNotificationsNone size={24} />
                </Button>

                <Nav.Link
                  as={Link}
                  to="/UserProf"
                  className="p-1"
                  style={{ color: '#FFFFFF' }}
                >
                  <FaRegUser size={22} />
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/login"
                  className="btn rounded-pill px-4"
                  style={{ backgroundColor: '#DAA520', color: '#FFFFFF' }}
                >
                  Login
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      {/* Overlay for closing dropdown */}
      {isDropdownVisible && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040 }}
          onClick={() => setIsDropdownVisible(false)}
        />
      )}
    </>
  );
};

export default Header;
