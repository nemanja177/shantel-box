import React from 'react';
import snow from '../js/snowstorm.js'

const footer = () =>{
    return (
    <div className='footer'>
        <p>&copy; kutija.net | v1.3.2a by Nemanja</p>
        <script src={snow}></script>
    </div>
    );
  }
  export default footer;