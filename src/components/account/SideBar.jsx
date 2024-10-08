import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdMenu } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import './ProfilePage.css';

const SideBar = () => {
  const navigate = useNavigate();

  // State to toggle the sidebar open/close
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
       <div className="bar-menu">
      </div>
      <div className="open-menu">
        <IoMdMenu className={`menu-icon ${isOpen ? 'hidden' : ''}`} onClick={toggleSidebar} />
      </div>

      

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        
      <div className="bar-menu">
        <IoClose className={`close-icon ${isOpen ? '' : 'hidden'}`} onClick={toggleSidebar} />
      </div>
        <h3>Profile</h3>
        <ul>
          <li onClick={() => navigate('/account')}>Profile Details</li>
          <li onClick={() => navigate('/order-history')}>Order History</li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
