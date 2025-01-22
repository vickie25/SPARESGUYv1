import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, Outlet, useLocation } from 'react-router-dom';

// import { FaChartBar } from 'react-icons/fa';
import Dashboard from './AdminDashboard';

import {
  FaChartBar,
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaCog,
  FaTags,
  FaClipboardList,
  FaComments,
  FaBell,
  FaSignOutAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import AdminHeader from './AdminHeader';
import styled from 'styled-components';


const sections = [
  { path: '/admin/dashboard', icon: <FaChartBar />, text: 'Dashboard', content: <Dashboard /> },
 
  // Add other sections here
];


const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarVariants = {
    expanded: { width: isMobile ? '250px' : '250px' },
    collapsed: { width: isMobile ? '0' : '70px' }
  };

  return (
    <>
      <AdminHeader />
      <Container fluid className="p-0">
        <Row className="g-0">
          <ToggleButton
            ismobile={isMobile.toString()}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <FaBars /> : <FaTimes />}
          </ToggleButton>

          <AnimatePresence>
            <SidebarContainer
              initial={false}
              animate={isCollapsed ? 'collapsed' : 'expanded'}
              variants={sidebarVariants}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              ismobile={isMobile.toString()}
              iscollapsed={isCollapsed.toString()}
            >
              <div className="py-4 px-3">
                {!isCollapsed && (
                  <BrandTitle
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    MY SPARES GUY
                  </BrandTitle>
                )}
                <Nav className="flex-column">
                  {[
                    { path: '/admin/dashboard', icon: <FaChartBar />, text: 'Dashboard' },
                    { path: '/admin/inventory', icon: <FaBox />, text: 'Inventory' },
                    { path: '/admin/customers', icon: <FaUsers />, text: 'Customers' },
                    { path: '/admin/orders', icon: <FaShoppingCart />, text: 'Orders' },
                    { path: '/admin/categories', icon: <FaTags />, text: 'Categories' },
                    { path: '/admin/reports', icon: <FaClipboardList />, text: 'Reports' },
                    { path: '/admin/reviews', icon: <FaComments />, text: 'Reviews' },
                    { path: '/admin/notifications', icon: <FaBell />, text: 'Notifications' },
                    { path: '/admin/settings', icon: <FaCog />, text: 'Settings' },
                    { path: '/logout', icon: <FaSignOutAlt />, text: 'Logout' }
                  ].map((item, index) => (
                    <NavItemStyled key={index} collapsed={isCollapsed}>
                      <Link
                        to={item.path}
                        className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                      >
                        <motion.span
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {item.icon}
                        </motion.span>
                        {!isCollapsed && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            {item.text}
                          </motion.span>
                        )}
                      </Link>
                    </NavItemStyled>
                  ))}
                </Nav>
              </div>
            </SidebarContainer>
          </AnimatePresence>

          <MainContent
            className={`ms-auto ${isMobile ? 'w-100' : ''}`}
            style={{
              marginLeft: isMobile ? '0' : (isCollapsed ? '70px' : '250px'),
              padding: '2rem'
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>

          </MainContent>
        </Row>
      </Container>
    </>
  );
};

export default AdminLayout;

// Styled Components
const SidebarContainer = styled(motion.div)`
  background: #000000;
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.1);
  overflow-x: hidden;
  border-right: 2px solid #DAA520;
  
  @media (max-width: 768px) {
    position: fixed;
    left: ${props => props.ismobile === "true" && props.iscollapsed === "true" ? '-100%' : '0'};
    top: 0;
    height: 100vh;
    z-index: 1050;
  }
`;

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  color: #DAA520;
  font-size: 1.5rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    color: #FFFFFF;
  }

  @media (max-width: 768px) {
    position: ${props => props.ismobile === "true" ? 'fixed' : 'relative'};
    left: ${props => props.ismobile === "true" ? '1rem' : '0'};
    top: ${props => props.ismobile === "true" ? '1rem' : '0'};
    z-index: 1060;
  }
`;

const NavItemStyled = styled(Nav.Item)`
  margin: 0.5rem 0;
  transition: all 0.3s ease;

  .nav-link {
    color: #FFFFFF;
    padding: 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 3px;
      height: 100%;
      background: #DAA520;
      transform: scaleY(0);
      transition: transform 0.3s ease;
    }

    &:hover, &.active {
      background: rgba(218, 165, 32, 0.1);
      color: #DAA520;

      &:before {
        transform: scaleY(1);
      }
    }

    svg {
      font-size: 1.2rem;
      margin-right: ${props => props.collapsed ? '0' : '1rem'};
    }
  }
`;

const MainContent = styled(Col)`
  transition: all 0.3s ease;
  background: #FFFFFF;
  min-height: 100vh;
`;

const BrandTitle = styled(motion.h4)`
  color: #DAA520;
  font-weight: bold;
  letter-spacing: 1px;
  margin-bottom: 2rem;
  text-align: center;
`;
