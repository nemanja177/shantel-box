//import logo from './logo.svg';
import './App.css';
// import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/LoginComponent';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Logout from './components/Logout';
import Footer from './components/Footer';

function getToken() {
  const tokenString = localStorage.getItem('access_token');
  // const userToken = JSON.parse(tokenString);
  // console.log(tokenString);
  return tokenString;
}

function App() {

  const token = getToken();

  // if(!token) {
  //   console.log(token);
  //   return <Login setToken={getToken} />
  // }
    return (
      <BrowserRouter>
        <div className="App"> 
        {/* {token !== null &&
          // <Navbar />
        } */}
          <Routes>
            {/* <Route path="/box/login" component = {LoginCompoment} exact/> */}
            <Route exact path='/' element={<Dashboard />} />
            {/* <Route path='/register' element={<Signup />} /> */}
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/logout' element={<Logout />} />
            {/* <Route path="/box/login">
              <Login />
            </Route> */}
          </Routes>
        </div> 
        {/* <Footer /> */}
      </BrowserRouter>
    );
  }

export default App;
