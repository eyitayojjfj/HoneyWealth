import React from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { FaSnapchat } from "react-icons/fa6";
import { IoLogoTiktok } from "react-icons/io5";
import './Footer.css'

const Footer = () => {




  return (
    <div className='foot'>
    < footer >
      <div className='grid'>
   <div className='fut'>
    <div><h5>ABOUT US</h5></div>
    <p>At Honeywealth Fragrances, we specialize in selling exquisite perfumes that captivate  the senses. Whether you're looking  for the perfect scent to express  your individuality or a gift that  leaves a lasting impression, our  curated collection has something for everyone.</p>
    </div>

    <div className='fut'>
    <div><h5>CONTACT US</h5></div>
    <p><IoLocationSharp />CITS University Of Lagos</p>
    <p><FaPhone />+234 704 819 8913</p>
    <p><BiLogoGmail /> honeywealth.fragrances@gmail.com</p>
    </div>
  
    <div className='us'>
    <div ><h5>INFORMATION</h5></div>
   <ul>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
    <li><a href="/privacy">Privacy Policy</a></li>
    <li><a href="terms">Terms And Conditions</a></li>
   </ul>
    </div>
    <div className='social'><h5>FOLLOW US</h5>
     <a href="https://instagram.com/honey_wealthfragrances?utm_source=qr&igshid=NGExMmI2YTkyZg%3D%3D"><FaInstagram /></a>
     <a href="https://wa.me/c/2347048198913"><FaWhatsapp /></a>
     <a href="https://www.snapchat.com/add/honey_wealthf?share_id=6eRELp92Cuo&locale=en-US"><FaSnapchat /></a>
     <a href="https://www.tiktok.com/@honey_wealthfragrances?_t=8pD99ovD5ok&_r=1"><IoLogoTiktok /></a>
    </div>
    </div>

    <div className='right'><p>Copyright © 2024 HoneyWealth Fragrances.</p></div>
  </footer>

  </div>
  )
}

export default Footer