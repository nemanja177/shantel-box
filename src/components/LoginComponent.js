import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import logo from '../images/ShantelLogo2.png'

axios.defaults.withCredentials = true;

const SERVER_ENDPOINT = `https://api.kutija.net/box/auth`;




// const HandleSubmit = async e => {
   
//     e.preventDefault();
//     let info = {
//         username: e.target[0].value,
//         password: e.target[1].value
//     };
//     await LoginAPI(info);
    
//     // if (localStorage.getItem("access_token") !== null) {
//     //     Redirect()
//     // } else {
//     //     alert("Pogresan username ili sifra");
//     // }
// }


export default function Login({setToken}) {

    const nav = useNavigate();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(null);
    const [maintenance, setMaintenance] = useState(null);

    const HandleSubmit = async e => {
        setError(null);
        setMaintenance(null);
        e.preventDefault();
        let data = {
            username: e.target[0].value,
            password: e.target[1].value
        };
        // const nav = useNavigate();
        // console.log(data);
        const LOGIN_ENDPOINT = `${SERVER_ENDPOINT}/login`;
        const config = {headers: {"Access-Control-Allow-Credentials": "true", "Access-Control-Allow-Origin": "*"} }
        let response = await axios.post(LOGIN_ENDPOINT, data)
            .catch(error => {
                if ( error.response ) {
                    const statusCode = error.response.status;
                    switch (statusCode) {
                        case 423: {
                            setMaintenance(error.response.data);
                            break;
                        }
                        case 403: {
                            setError("Pogrešno korisničko ime ili šifra"); 
                            break;
                        }
                    }
                }
            });
            // console.log(response.status + " " + response.data.accessToken + " " + response.data.expiresIn + " " + response.data.id );
        if(response.status === 200 && response.data.userTokenState.accessToken && response.data.userTokenState.expiresIn){
            let accessToken = response.data.userTokenState.accessToken;
            let expire_at = response.data.userTokenState.expiresIn;
            // let id = response.data.id;
                // console.log(accessToken + " " + expire_at + " " + id );
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("expire_at", expire_at);
                // const nav = useNavigate();
                // nav("/box", {replace: true});
                // Login();
                // document.getElementById('loginError').classList.add('hidden'); ////
            window.location.reload();
        }
        // else if (response.status === 423) {

        //     setMaintenance(response.data);
        //     // console.log("lavor");
        //     // document.getElementById('loginError').classList.remove('hidden');
        // } else {
        //     setError("Pogrešno korisničko ime ili šifra");
        // }
            
            console.log(response.data);
        //  catch(e){
        //     console.log(e.code);
        //     // document.getElementById('loginError').classList.remove('hidden');
        // }
    }

    useEffect(() => {
        if ( localStorage.getItem("access_token") !== null ) { 
            nav("/", {replace: true});
        }
    });
        // useState(() => {
            
        // })
        if ( maintenance != null ) {
            const dataStartObject = new Date(maintenance.dateStart);
            const dataEndObject = new Date(maintenance.dateEnd);

            const startYear = dataStartObject.getFullYear();
            const startMonth = dataStartObject.getMonth() + 1; 
            const startDay = dataStartObject.getDate();
            const startHour = dataStartObject.getHours();
            const startMinute = dataStartObject.getMinutes();

            const endYear = dataEndObject.getFullYear();
            const endMonth = dataEndObject.getMonth() + 1; 
            const endDay = dataEndObject.getDate();
            const endHour = dataEndObject.getHours();
            const endMinute = dataEndObject.getMinutes();
        }        
        return (
            <div className="login-background">
                <div className="login-holder">
                    <h2>Dobro Došli</h2>
                    <div className="login-logo-holder">
                        <img src={logo} alt="logo"></img>
                    </div>
                    {error != undefined && 
                        <>
                            <h4 className="red">{error}</h4>
                        </>
                    }
                    {maintenance != undefined &&
                        <>
                            <h4 className="red">{maintenance.message}</h4>
                            <h4 className="red">Od {maintenance.dateStart} do {maintenance.dateEnd}</h4>
                        </>
                    }
                    
                    {/* <h4 id="loginError" className="hidden red">Pogrešno korisničko ime ili šifra</h4> */}
                    <form onSubmit={HandleSubmit}>
                        <div className="txt-field">
                            <input type="text" required />
                            <span></span>
                            <label>Korisničko Ime</label>
                        </div>
                        <div className="txt-field">
                            <input type="password" required />
                            <span></span>
                            <label>Šifra</label>
                        </div>
                        <div className="login-button-div">
                            <button className="btn-grad" type="submit">LOGIN</button>
                        </div>
                    </form>
                </div>
            </div>

            // <div className="login-background">
            //     <div className="login-holder">
            //         <h2>Login</h2>
            //         <div className="login-logo-holder">
            //             <img src={logo} alt="logo"></img>
            //         </div>
            //         <h4 id="loginError" className="hidden red">Pogrešno korisničko ime ili šifra</h4>
            //         <form onSubmit={HandleSubmit}>
            //             <label>
            //                 <p>Korisničko ime</p>
            //                 <input type="text" onChange={e => setUserName(e.target.value)}/>
            //             </label>
            //             <label>
            //                 <p>Šifra</p>
            //                 <input type="password" onChange={e => setPassword(e.target.value)}/>
            //             </label>
            //             <div className="login-button-div">
            //                 <button type="submit">LOGIN</button>
            //             </div>
            //         </form>
            //     </div>
            // </div>
        )
    }

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};