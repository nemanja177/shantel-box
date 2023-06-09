//import logo from './logo.svg';
import './App.css';
import axios from 'axios';
// import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/LoginComponent';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Logout from './components/Logout';
import Footer from './components/Footer';
import { useNavigate } from "react-router-dom"
import verifySession from './services/VerifyToken'
import Registration from './components/Registration';
import About from './components/About';
import LastMonthComponent from './components/LastMonthComponent';
import Bonuses from './components/Bonuses';
import RangList from './components/RangList';
import { useEffect } from 'react';
import PrivateRoute from './components/PrivateRoute';
import GiftCode from './components/GiftCode';

function getToken() {
  const tokenString = localStorage.getItem('access_token');
  // const userToken = JSON.parse(tokenString);
  // console.log(tokenString);
  return tokenString;
}

function App() {

  const token = getToken()

  // const [currentUser, setCurrentUser] = useState(undefined);

  // useEffect(() => {
      /* ovde napraviti servis koji proverava da li je token ispravan, odnosno da li uopste postoji. 
      Dobija se status kod sa bekenda i prosledjuje se na glavnu stranu gde se, u zavisnost od status koda, redirektuje na odredjenu stranicu */
  // })

  // const verified = verifySession.verifySession;
  // const navigate = useNavigate();

  // if( verified !== true ) {
  //   navigate("/logout", {replace: true});
  // }
  // if(!token) {
  //   console.log(token);
  //   return <Login setToken={getToken} />
  // }
  // console.log("IZ APP BODIJA: " + verifySession);
    return (
      <BrowserRouter>
        <div className="App"> 
        {/* {token !== null &&
          // <Navbar />
        } */}
          <Routes>
            {/* <Route path="/box/login" component = {LoginCompoment} exact/> */}

            {/* <Route exact path='/' element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
              } 
            /> */}


            <Route exact path='/' element={<Dashboard />} />



            {/* <Route path='/register' element={<Signup />} /> */}
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/logout' element={<Logout />} />
            <Route exact path='/register' element={<Registration />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/lastMonth' element={<LastMonthComponent />} />
            <Route exact path='/bonuses' element={<Bonuses />} />
            <Route exact path='/ranglist' element={<RangList />} />
            <Route exact path='/giftcode' element={<GiftCode />} />
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
