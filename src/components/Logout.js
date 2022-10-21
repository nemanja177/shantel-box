import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom"

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
// async function delayedMessage() {
//     await logoutAPI();
//     Logout();
// }

const logoutAPI = async (navigate) => {
    // const history = useHistory();
    let response = await axios.get("https://kutija.net:8080/box/auth/logout")

    if ( response.status === 200 ) {
        localStorage.clear();
    }
    // <Redirect to='/box'/>
    navigate("/login", {replace: true});

}

export default function Logout() {
    const navigate = useNavigate();

    logoutAPI(navigate);
    // useEffect(() => {
    //     // await sleep(1000);
    //     // delayedMessage();
    //     // console.log("TU SAM")
    //     // navigate("/login", {replace: false});
    // }, []);
   

    // history.push("/box");
   
}