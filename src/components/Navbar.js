import React from 'react';
import {  Link } from "react-router-dom";
import logo from '../images/logo.png';




const Navbar= () =>{
    
    return (
    <div className='navigation'>
      <div className='nav-logo'>
        <img src={logo} alt='logo'></img>
      </div>
      <div>
        <button id="mobile-nav" onClick={() => document.getElementById("nav-elements").style.width = "250px"}>☰</button>
      </div>
      <div id="nav-elements" className='nav-elements'>
        <p class="closebtn" onClick={() => document.getElementById("nav-elements").style.width = "0"}>×</p>
        <p>
          <Link to="/">Home</Link>
        </p>
        <p>
          <Link to="/about">About</Link>
        </p>
        <p>
          <Link to="/logout">Logout</Link>
        </p>
      </div>
    </div>
    );
    // function openNav() {
    //   document.getElementById("nav-elements").style.width = "250px";
    //   // document.getElementById("main").style.marginLeft = "250px";
    // }
    
    // function closeNav() {
    //   document.getElementById("nav-elements").style.width = "0";
    //   // document.getElementById("main").style.marginLeft= "0";
    // }
  }
  
  export default Navbar;