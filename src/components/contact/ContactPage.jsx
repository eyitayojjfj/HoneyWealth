import React from 'react';
import { IoLocationSharp } from 'react-icons/io5';
import { FaPhone } from 'react-icons/fa6';
import { BiLogoGmail } from 'react-icons/bi';
import './ContactPage.css'; // Import the CSS file

const ContactPage = () => {
  return (
    <div className="contact">
      <h1>Contact Us At</h1>
      <div className="contact-info">
        <p><IoLocationSharp /> CITS University Of Lagos</p>
        <p><FaPhone /> +234 704 819 8913</p>
        <p><BiLogoGmail /> honeywealth.fragrances@gmail.com</p>
       
      </div>
      <div className="map-container">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4082.53948447267!2d3.392929620306423!3d6.518234693253116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8ce6bbfa4cfb%3A0x30c4299889b3b31f!2sCITS%20(Centre%20for%20Information%20and%20Technology%20System)!5e0!3m2!1sen!2sng!4v1726149940809!5m2!1sen!2sng" 
        width="600" 
        height="450" 
        style={{ border: 0 }}
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
  );
};

export default ContactPage;
