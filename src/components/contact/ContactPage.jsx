
import React from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";

const ContactPage = () => {

  const style = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr ",
    gap: "18px",
    padding: "28px",
    paddingLeft: "90px",
    fontSize: '30px',
    display: "inline",
    
  }


  return (
    <div className='contact'> <div><h1>Contact Us At</h1></div>
    <div style={style}>
    <p><IoLocationSharp />CITS University Of Lagos</p>
    <p><FaPhone />+234 704 819 8913</p>
    <p><BiLogoGmail />osenioyinkansola171206@gmail.com</p>
    </div>
    </div>
  )
}

export default ContactPage