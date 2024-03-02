import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import '../css/style.css';
import zatvorenPoklon from '../images/111.png' // 1
// import zatvorenPoklon from '../images/rsz_poklonzatvorenbezpozadine.png';
import animiraniPoklon from '../images/animirani2.gif' // 2
// import animiraniPoklon from '../images/smanjenAnimiran-bezPozadine.gif';
import slikaOtvorenogPoklona from '../images/vecOtvorenBezPozadine.png'; // 3

// easter-egg 

// import animiranoJaje from '../images/animatedegg.gif';
// import zatvorenoJaje from '../images/closedegg.png';
// import otvorenoJaje from '../images/openedegg.png';

// ------------
import firegif from '../images/firegif.gif';
import iceIcon from '../images/iceIcon.png'
import tombstone from '../images/tombstone.png'
// import diamond from '../images/diamond-icon.png'
import ruby from '../images/ruby.png'
// import goldCoin from '../images/Gold-coin-icon.png'
import crownMedal from '../images/crown-medals.png'
import iceCube from '../images/ice-melting.png'
// import postolje from '../images/rsz_postolje.png'
// import arrowDown from '../images/arrow_down.png'
import bonusArrow from '../images/right-arrow.png'
import unknownUser from '../images/whiteQuestion.png'
import evri from '../images/1o-evrica.png'
import dayoff from '../images/day-off.png'
import Navbar from './Navbar';
import Footer from './Footer';
import PropTypes from 'prop-types';
import LoadingAnimation from './LoadingAnimation';

axios.defaults.withCredentials = true;
const AUTH_PATH = `https://api.kutija.net/box/auth`;
const SERVER_PATH = "https://api.kutija.net/box/bodovi";
const BONUS_PATH = "https://api.kutija.net/box/bonusBodovi"
const config = {headers: {"Authorization": `Bearer ${localStorage.getItem("access_token")}`, "Access-Control-Allow-Credentials": "true", "Access-Control-Allow-Origin": "*"}}
const token = localStorage.getItem("access_token");


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function delayedMessage(box) {
  const cls = ["transparent", "small", "small-img"];
  await sleep(3800); // 3800
  let points = document.getElementById("points");
  let point = document.getElementById("point");
  let opened = document.getElementById("opened");
  points.classList.remove(...cls);
  point.classList.remove(...cls);
  opened.classList.remove(...cls);
}

async function displayBonusDiv() {
  await sleep(5000);
}

const validate = async() => {
  try {
    let response = await axios.get(`${AUTH_PATH}/validate`)
    console.log(response.data);
    return response.data;
  } catch(e) {
    console.log(e);
  }
}

let dobijeniBodovi = 0;

const getPoslednjiOtvoreni = async () => {
  const response = await fetch(`${SERVER_PATH}/lastOpen`);
  // console.log("Poslednji otvoreni bodovi " + await response.json());
  return await response.json();
  // setPoslednjiOtvoreni(await response.json());
}


const getDnevniBonusi = async () => {
  const response = await fetch(`${BONUS_PATH}/dailyRecentBonus`);
  return await response.json();
    // setDnevniBonusi(await response.json());
}

const getDozvoljenPoklon = async () => {
  const response = await axios(`${SERVER_PATH}/check`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    withCredentials: true
  })
  return response.data;

  // setDozvoljenPoklon(response.data);
  // setOtvorenPoklon(response.data);
}

const getUnopenedUsers = async () => {
  // let token = localStorage.getItem("access_token");
  // let response = await axios(`${SERVER_PATH}/userswhodidntnopen`, {
  //   method: "GET",
  //   headers: {
  //     "Authorization": `Bearer ${token}`
  //   }
  // })
  const response = await fetch(`${SERVER_PATH}/userswhodidntnopen`);
  return await response.json();
  // setUnopenedUsers(await response.json());
  // setUnopenedUsers(response.data);
}

const getRandomUsers = async () => {
  // const response = await fetch(`${SERVER_PATH}/randomUsers`, config);
  const response = await axios(`${BONUS_PATH}/randomUsers`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    withCredentials: true
  });
  displayBonusDiv();
  return response.data;
}

export default function Dashboard() {

    const [poslednjiOtvoreni, setPoslednjiOtvoreni] = useState([]);
    const [dnevniBonusi, setDnevniBonusi] = useState([]);
    const [dozvoljenPoklon, setDozvoljenPoklon] = useState();
    const [otvorenPoklon, setOtvorenPoklon] = useState();
    const [validated, setValidated] = useState(false);
    const [randomUsers, setRandomUsers] = useState();
    const [dataShown, setDataShown] = useState(false);
    const [loading, setLoading] = useState(true);
    const [unopenedUsers, setUnopenedUsers] = useState([]);
    const [bodovi, setBodovi] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
      const getValidated = async () => {
        let response = await axios(`${AUTH_PATH}/validate2?token=` + token, {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true
        })
        console.log("VALIDIRANO?: " + response.data);
        setValidated(response.data);
        // setLoading(false);
      }
      getValidated();
    })
 

    useEffect(() => {

      const fetchData = async () => {
        await validate();
        const poslednjiOtvoreniData = await getPoslednjiOtvoreni();
        const dnevniBonusiData = await getDnevniBonusi();
        const dozvoljenPoklonData = await getDozvoljenPoklon();
        const unopenedUsersData = await getUnopenedUsers();
        const randomUsersData = await getRandomUsers();
  
        setPoslednjiOtvoreni(poslednjiOtvoreniData);
        console.log(dnevniBonusiData);
        setDnevniBonusi(dnevniBonusiData);
        setDozvoljenPoklon(dozvoljenPoklonData);
        setUnopenedUsers(unopenedUsersData);
        setRandomUsers(randomUsersData);
        setLoading(false);
      };
  
      fetchData();
      // enabled
      // getRandomUsers();

  
      //   getPoslednjiOtvoreni()
      //   getDozvoljenPoklon()
      //   getDnevniBonusi()
      //   getUnopenedUsers();
    }, [])  // loading validated


    // enabled --------------------------------------------------------------------
    // if ( localStorage.getItem("access_token") === null || validated !== true ) {
    //   console.log(localStorage.getItem('access_token') + " " + validated); 
    //   navigate("/logout", {replace: true});
    // }

    useEffect(() => {
      if (!loading && (!token || !validated)) {
        console.log('localStorage.getItem("access_token"): ', localStorage.getItem("access_token"));
        console.log('validated: ', validated);
        navigate("/logout", { replace: true });
      }
      // if (loading) {
      //   return;
      // }
      // if (localStorage.getItem("access_token") === null || !validated) {
      //   console.log('localStorage.getItem("access_token"): ', localStorage.getItem("access_token"));
      //   console.log('validated: ', validated);
      //   navigate("/logout", { replace: true });
      // }
    }, [loading, validated, token]);

    const imageClick = async (dozvoljenPoklon) => {
      setDozvoljenPoklon(false);
      const response = await axios(`${SERVER_PATH}/check`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true
      })
      if ( response.data !== false ) {
        
        try {
          let response = await axios(`${SERVER_PATH}`, {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            withCredentials: true
          })
          if ( response.status === 200) {

            if ( response.data.specijalnaNagrada !== null )
              dobijeniBodovi = response.data.specijalnaNagrada; 
            else 
              dobijeniBodovi = response.data.brojBodova; 
          }
          getRandomUsers();
        } catch(e){
            console.log(e);
        }
      }
    }

    const sendBonusPoints = async (id) => {
      const response = await axios(`${BONUS_PATH}/chosen/?id=${id}`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true
      })
      if ( response.data !== false ) {
        alert("Uspesno ste dali korisniku bodove");
      }
    }

    const handleChange = () => {
      setDataShown(!dataShown);
    };

    return (
      <div>
        <Navbar/>  
        {loading ? (
          <LoadingAnimation />
        ) : (
        <>
          <div className='content-holder'>
            <div className='left-side'>
              <h2 id='opened' className='small transparent'>Otvorili ste poklon danas. Novi vas čeka sutra!</h2>
              <h2 id='points' className='small transparent'>{bodovi > 0 ? "Čestitamo" : "Nažalost"}, dobili ste {bodovi}{isNaN(bodovi) ? '' : ' bodova!'}</h2>
              {
                (() => {
                  if(otvorenPoklon === true) {
                  // console.log("DOZVOLJENO?: ", dozvoljenPoklon);
                    return (
                      <div className='imageHolder'>
                        <img className='clickable-pointer' src={zatvorenPoklon} id='box' alt='zatvorenPoklon' onClick={dozvoljenPoklon ? () => imageClick(dozvoljenPoklon).then(() => {
                          let box = document.getElementById("box");
                          box.setAttribute('src', animiraniPoklon);
                          setBodovi(dobijeniBodovi);
                          delayedMessage(box);
                        }) : null } style={{"pointerEvents": "all"}} ></img>
                      
                        {(() => {
                            switch(bodovi) {
                              case "Slobodan Dan": {
                                return (
                                  <img id="point" src={dayoff} className='special-price small-img' alt='slobodan dan'></img>
                                )
                              }
                              case "10 Evra": {
                                return (
                                  <img id="point" src={evri} className='special-price small-img' alt='evri'></img>
                                )
                              }
                              default: {
                                return (
                                  <h1 id="point" className="transparent small">{bodovi}</h1>
                                )
                              }
                            }
                        })()}
                      </div>
                    )
                  } else {
                      return (
                        <div>
                          <h2>Već ste otvorili poklon danas. Novi vas čeka sutra!</h2>
                          <img src={slikaOtvorenogPoklona} className='already-opened-gift' alt='zatvorena-kutija'></img>
                        </div>
                      )
                    }
                }
                )()  
              }  
              { randomUsers !== undefined && typeof(randomUsers) !== "string" &&
              <div className='select-bonus-holder'>
                <h2>Čestitamo, dobili ste dodatnu nagradu!</h2>
                <h4>Izaberite korisnika kojem želite da da dodelite 20 bodova!</h4>
                <p>Otvaranje nove kutije nije moguće ukoliko bonus nije nekome dodeljen!</p>
                <div className='bonus-users-holder'>
                  {randomUsers.map((data) => {
                    return (
                      <div className='bonus-user-holder' onClick={() => sendBonusPoints(data.id).then(() => { 
                        window.location.reload(true);
                      }) } style={{"pointerEvents": "all"}}>
                        <div style={{backgroundImage: `url(${data.slika})`}} className='small-image-div additional-rewards-image'></div>
                        <p className='bonus-user-name' key={data.id}>{data.ime}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
              }
            </div>
            <div className='right-side'>
              <div className='table-div-holder'>
                <div className="btn-container">
                  <label className="switch btn-display-mode-switch">
                    <input type="checkbox" name="display_mode" id="display_mode" checked={dataShown} onChange={handleChange} />
                    <label for="display_mode" data-on="Bonusi" data-off="Poslednje Otvoreni" className="btn-display-mode-switch-inner"></label>
                  </label>
                </div>
              </div>
              {dataShown === false && 
                <div className='last-opened-holder'>
                  {poslednjiOtvoreni.map((data) => {
                    let addedClass = 'last-opened';
                    if ( data.bod.specijalnaNagrada != "10 Evra" && data.bod.specijalnaNagrada != "Slobodan Dan" ) {
                      if ( data.bod.brojBodova >= 185 ) {
                        addedClass+= ' lucky';
                      } else if ( data.bod.brojBodova <= -85 ) {
                        addedClass+= ' unlucky';
                      } 
                    }
                    
                    return (
                      <div className={addedClass}>
                        <div style={{backgroundImage: `url(${data.korisnik.slika})`}} className='small-image-div'></div>
                        <p className='last-opened-element' key={data.id}>{data.korisnik.ime}</p>
                        <div className='points-gif-holder'>
                          {data.bod.brojBodova > 85 && data.bod.brojBodova <= 120 &&
                            <img src={firegif} className='icons firegif'></img>
                          }
                          {data.bod.brojBodova <= -20 && data.bod.brojBodova > -85 &&
                            <img src={iceCube} className='icons icecube'></img>
                          }
                          {data.bod.brojBodova <= -85 && 
                            <img src={tombstone} className='icons tombstone'></img>
                          }
                          {data.bod.brojBodova >= 185 && 
                            <img src={crownMedal} className='icons crownMedal'></img>
                          }
                          {data.bod.brojBodova > 120 && data.bod.brojBodova < 185 &&
                            <img src={ruby} className='icons ruby'></img>
                          }
                          {(data.bod.brojBodova < 15 && data.bod.specijalnaNagrada === null && data.bod.brojBodova > -20 ) &&
                            <img src={iceIcon} alt='iceIcon' className='icons ice-icon'></img>                          
                          }
                          {data.bod.specijalnaNagrada === null &&
                            <p className='last-opened-element element-bodovi' key={data.id}>{data.bod.brojBodova}</p>
                          }
                          {data.bod.specijalnaNagrada === "Slobodan Dan" &&
                            <img src={dayoff} className='last-opened-element element-specijalna-nagrada' key={data.id}></img>
                          }
                          {data.bod.specijalnaNagrada === "10 Evra" &&
                            <img src={evri} className='last-opened-element element-specijalna-nagrada' key={data.id}></img>
                          }
                        </div>
                      </div>
                    )
                  })}
              </div>
              } 
              { dataShown === true &&
              <div className='bonus-total-holder'>     
                {dnevniBonusi.map((data) => {
                  let receiverImage;
                  if (data.receiver === null ) { 
                    receiverImage = unknownUser;
                  } else {
                    receiverImage = data.receiver.slika;
                  }
                  return (
                    <div className='bonus-holder' >
                      <div style={{backgroundImage: `url(${data.sender.slika})`}} className='small-image-div'></div>
                      <div className='bonus-info'>
                        <p>{data.value} Poena</p>
                        <img src={bonusArrow} className='bonusArrow'></img>
                      </div>
                      <div style={{backgroundImage: `url(${receiverImage})`}} className='small-image-div'></div>
                    </div>
                  )
                })}
              </div>
              }   
            </div> 
          </div>
          <h3 className='center'>Ljudi koji danas još nisu otvorili kutiju</h3>
          <div className='unopened-users'>
            {unopenedUsers.map((data) => {
              return (
                <div className='unopened-user-image'>
                  <div style={{backgroundImage: `url(${data.slika})`}} className='small-image-div'></div>
                </div>
              )
            })}
          </div>
          <img src={animiraniPoklon} style={{display: 'none'}} alt='animiraniPreload'></img>
          {/* <Footer /> */} 
        </>
      )}
    </div>
  )
}
Dashboard.propTypes = {
  setUser: PropTypes.func.isRequired
};