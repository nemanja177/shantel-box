import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';

axios.defaults.withCredentials = true;

const SERVER_ENDPOINT = `https://bigalslist.com:8080/box/auth`;

const LoginAPI = async (data) => {
    // const nav = useNavigate();
    // console.log(data);
    const LOGIN_ENDPOINT = `${SERVER_ENDPOINT}/login`;
    const config = {headers: {"Access-Control-Allow-Credentials": "true", "Access-Control-Allow-Origin": "*"} }

    try {

        let response = await axios.post(LOGIN_ENDPOINT, data);
        // console.log(response.status + " " + response.data.accessToken + " " + response.data.expiresIn + " " + response.data.id );
        if(response.status === 200 && response.data.accessToken && response.data.expiresIn){
            let accessToken = response.data.accessToken;
            let expire_at = response.data.expiresIn;
            let id = response.data.id;
            // console.log(accessToken + " " + expire_at + " " + id );
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("expire_at", expire_at);
            // const nav = useNavigate();
            // nav("/box", {replace: true});
            // Login();
            document.getElementById('loginError').classList.add('hidden');
            window.location.reload();
        } else {
            // console.log("lavor");
            // document.getElementById('loginError').classList.remove('hidden');
        }
        
        console.log(response.data);

    } catch(e){
        console.log(e);
        document.getElementById('loginError').classList.remove('hidden');
    }
}


const HandleSubmit = async e => {
   
    e.preventDefault();
    let info = {
        username: e.target[0].value,
        password: e.target[1].value
    };
    await LoginAPI(info);
    
    // if (localStorage.getItem("access_token") !== null) {
    //     Redirect()
    // } else {
    //     alert("Pogresan username ili sifra");
    // }
}


export default function Login({setToken}) {
    const nav = useNavigate();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
        useEffect(() => {
            if ( localStorage.getItem("access_token") !== null ) { 
                nav("/", {replace: true});
            }
        });
        // useState(() => {
            
        // })
        
        return (
            <div className="login-background">
                <div className="login-holder">
                    <h2>Login</h2>
                    <h4 id="loginError" className="hidden red">Pogresno korisnicko ime ili sifra</h4>
                    <form onSubmit={HandleSubmit}>
                        <label>
                            <p>Korisnicko ime</p>
                            <input type="text" onChange={e => setUserName(e.target.value)}/>
                        </label>
                        <label>
                            <p>Sifra</p>
                            <input type="password" onChange={e => setPassword(e.target.value)}/>
                        </label>
                        <div className="login-button-div">
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};