import React from 'react';
import {  Link } from "react-router-dom";
import logo from '../images/ShantelLogo2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const Navbar= () =>{
    
    return (
    <div className='navigation'>
      <div className='nav-logo'>
        <a href='https://kutija.net/'><img src={logo} className='logo' alt='logo'></img></a>
      </div>
      <div>
        <button id="mobile-nav" onClick={() => document.getElementById("nav-elements").style.width = "250px"}>☰</button>
      </div>
      <div id="nav-elements" className='nav-elements'>
        <p class="closebtn" onClick={() => document.getElementById("nav-elements").style.width = "0"}>×</p>
        <p className='nav-element'>
          {/* <Link to="/">Home</Link> */}
          <a href='https://kutija.net'><FontAwesomeIcon icon={solid('house')} /> Početna</a>
        </p>
        <p className='nav-element'>
          <Link to="/ranglist"><FontAwesomeIcon icon={solid("ranking-star")} />  Rang Lista</Link>
        </p>
        <p className='nav-element'>
          <Link to="/lastMonth"><FontAwesomeIcon icon={solid("crown")} />  Prošlomesečni Pobednici</Link>
        </p>
        <p className='nav-element'>
          <Link to="/bonuses"><FontAwesomeIcon icon={solid("chart-simple")} />  Lista Bonusa</Link>
        </p>
        <p className='nav-element'>
          <Link to="/about"><FontAwesomeIcon icon={solid("clipboard-list")} />  Izmene</Link>
        </p>
        <p className='nav-element'>
          <Link to="/logout"><FontAwesomeIcon icon={solid("arrow-right-from-bracket")} /> Izloguj se</Link>
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