import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaSearch, 
  FaBell, 
  FaEnvelope, 
  FaUserCircle,
  FaMoon,
  FaSun,
  FaSignOutAlt
} from 'react-icons/fa';


const AdminHeader = () => {
  const [isDark, setIsDark] = useState(false);
  const [notifications] = useState(3);
  const [messages] = useState(5);

  const toggleTheme = () => {
    setIsDark(!isDark);
    // You can implement your theme switching logic here
  };

  return (
    <HeaderContainer isDark={isDark}>
      <HeaderContent>
        <SearchBar isDark={isDark}>
          <FaSearch />
          <input 
            type="text" 
            placeholder="Search..." 
            aria-label="Search"
          />
        </SearchBar>

        <ActionButtons>
          <IconButton
            isDark={isDark}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </IconButton>

          <IconButton
            isDark={isDark}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaBell />
            {notifications > 0 && (
              <NotificationBadge>{notifications}</NotificationBadge>
            )}
          </IconButton>

          <IconButton
            isDark={isDark}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope />
            {messages > 0 && (
              <NotificationBadge>{messages}</NotificationBadge>
            )}
          </IconButton>

          <UserProfile isDark={isDark}>
            <div className="user-info">
              <div className="name">apbc</div>
              <div className="role">Administrator</div>
            </div>
            <IconButton
              isDark={isDark}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaUserCircle />
            </IconButton>
            <IconButton
              isDark={isDark}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSignOutAlt />
            </IconButton>
          </UserProfile>
        </ActionButtons>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default AdminHeader;


const HeaderContainer = styled.header`
  background: ${props => props.isDark ? '#1a1a1a' : '#ffffff'};
  border-bottom: 2px solid ${props => props.isDark ? '#2d2d2d' : '#f0f0f0'};
  padding: 1rem 2rem;
   position: 'fixed',
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
`;

const SearchBar = styled.div`
  position: relative;
  flex: 0 1 400px;

  input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 3rem;
    border: none;
    border-radius: 50px;
    background: ${props => props.isDark ? '#2d2d2d' : '#f5f5f5'};
    color: ${props => props.isDark ? '#ffffff' : '#333333'};
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px #DAA520;
      background: ${props => props.isDark ? '#333333' : '#ffffff'};
    }
  }

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #DAA520;
    font-size: 1.2rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const IconButton = styled(motion.button)`
  background: transparent;
  border: none;
  color: ${props => props.isDark ? '#ffffff' : '#333333'};
  font-size: 1.2rem;
  padding: 0.5rem;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    color: #DAA520;
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4757;
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.4rem;
  font-size: 0.7rem;
  font-weight: bold;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-left: 1.5rem;
  border-left: 2px solid ${props => props.isDark ? '#2d2d2d' : '#f0f0f0'};

  .user-info {
    display: none;
    @media (min-width: 768px) {
      display: block;
    }
  }

  .name {
    font-weight: 600;
    color: ${props => props.isDark ? '#ffffff' : '#333333'};
  }

  .role {
    font-size: 0.8rem;
    color: ${props => props.isDark ? '#cccccc' : '#666666'};
  }
`;
