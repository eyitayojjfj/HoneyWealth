import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const SideBar = () => {
    const navigate = useNavigate();

  
   

    return (
        <>
            {/* Sidebar */}
            <div className='sidebar'>
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
