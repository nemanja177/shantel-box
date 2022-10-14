import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import '../css/style.css';
import zatvorenPoklon from '../images/rsz_poklonzatvorenbezpozadine.png';
import animiraniPoklon from '../images/smanjenAnimiran-bezPozadine.gif';
import slikaOtvorenogPoklona from '../images/vecOtvorenBezPozadine.png';
import postolje from '../images/pobednickoPostolje.png'
import Navbar from './Navbar';

axios.defaults.withCredentials = true;
const AUTH_PATH = `https://bigalslist.com:8080/box/auth`;
const SERVER_PATH = "https://bigalslist.com:8080/box/bodovi";
const config = {headers: {"Authorization": `Bearer ${localStorage.getItem("access_token")}`, "Access-Control-Allow-Credentials": "true", "Access-Control-Allow-Origin": "*"}}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function delayedMessage(box) {
  await sleep(3800);
  let points = document.getElementById("points");
  let point = document.getElementById("point");
  let opened = document.getElementById("opened");
  points.classList.remove("hidden");
  point.classList.remove("hidden");
  opened.classList.remove("hidden");
  
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
// let dozvoljenPoklon;
// const imageClick = async (dozvoljenPoklon) => {
//   try {
//     let response = await axios.post(`${SERVER_PATH}`, config)

//     if ( response.status === 200) {
//       dobijeniBodovi = response.data.brojBodova;
//       setDozvoljenPoklon(!dozvoljenPoklon);
//       console.log(dobijeniBodovi);
//     }
//   } catch(e){
//       console.log(e);
//   }
// }


export default function Dashboard() {
    const [mesecniBodovi, setMesecniBodovi] = useState([]);
    const [jucerasnjiBodovi, setJucerasnjiBodovi] = useState([]);
    const [dnevniBodovi, setDnevniBodovi] = useState([]);
    const [poslednjiOtvoreni, setPoslednjiOtvoreni] = useState([]);
    const [dozvoljenPoklon, setDozvoljenPoklon] = useState();
    const [otvorenPoklon, setOtvorenPoklon] = useState();
    const [prosliMesecBodovi, setProsliMesecBodovi] = useState([]);
    const [validated, setValidated] = useState();

    const arraySrcs = [{animiraniPoklon}]
    
    const [bodovi, setBodovi] = useState(0);
    // let dobijeniBodovi = 0;
    const navigate = useNavigate();

 

    useEffect(() => {
      // const getValidated = async () => {
      //   let response = await axios.get(`${AUTH_PATH}/validate`, config)
  
      //   setValidated(response.data);
      // }

      const getValidated = async () => {
        let response = await axios(`${AUTH_PATH}/validate`, {
          method: "GET",
          config: config,
          withCredentials: true
        })
        console.log("VALIDIRANO?: " + response.data);
        setValidated(response.data);
      }

      getValidated()

      const getMesecniBodovi = async () => {
        const response = await fetch(`${SERVER_PATH}/mesecni`);
  
        setMesecniBodovi(await response.json());
      }
  
      const getJucerasnjiBodovi = async () => {
        const response = await fetch(`${SERVER_PATH}/jucerasnji`);
  
        setJucerasnjiBodovi(await response.json());
      }
  
      const getDnevniBodovi = async () => {
        const response = await fetch(`${SERVER_PATH}/dnevni`);
  
        setDnevniBodovi(await response.json());
      }

      const getPoslednjiOtvoreni = async () => {
        const response = await fetch(`${SERVER_PATH}/lastOpen`);
        
        setPoslednjiOtvoreni(await response.json());
      }
  
      const getProsliMesecBodovi = async () => {
        const response = await fetch(`${SERVER_PATH}/prosliMesec`);
  
        setProsliMesecBodovi(await response.json());
      }
  
      const getDozvoljenPoklon = async () => {
        const response = await axios.get(`${SERVER_PATH}/check`, config);
        // console.log(response.data);
        setDozvoljenPoklon(response.data);
        setOtvorenPoklon(response.data);
        // console.log(dozvoljenPoklon);
        // dozvoljenPoklon = response.data;
        // setDozvoljenPoklon(await response)
      }

      // {arraySrcs.map((e) => (
      //   <img src={e} style={{ display: "block" }} />
      // ))}
      
      // if ( localStorage.getItem("access_token") !== null && validated === true ) {
        getMesecniBodovi()
        getJucerasnjiBodovi();
        getDnevniBodovi()
        getPoslednjiOtvoreni()
        getProsliMesecBodovi()
        getDozvoljenPoklon()
        // console.log(dozvoljenPoklon);
      
      // } else {
      //   navigate("/logout", {replace: true});
      // }
      // let validated = validate();
    }, [])
    // console.log(validated);
    if ( localStorage.getItem("access_token") === null || validated !== true ) {
      console.log(localStorage.getItem('access_token') + " " + validated);
      navigate("/logout", {replace: true});
    }
    // const getValidated = async () => {
    //   let response = await axios.get(`${AUTH_PATH}/validate`)

    //   setValidated(response.data);
    // }

    

    // if (dozvoljenPoklon === false ) {
    //   let box = document.getElementById("box");
    //   console.log("USAO");
    //   box.setAttribute('style', "display: none;");
    // }

    const imageClick = async (dozvoljenPoklon) => {
      try {
        let response = await axios.post(`${SERVER_PATH}`, config)
    
        if ( response.status === 200) {
          dobijeniBodovi = response.data.brojBodova;
          setDozvoljenPoklon(false);
          // dozvoljenPoklon = false;
          console.log(dobijeniBodovi);
        }
      } catch(e){
          console.log(e);
      }
      // console.log("DOZVOLJEN?: IZ KLIK FUNC: ", dozvoljenPoklon);
    }

    return (
      <div>
       <Navbar/>  
        <div className='content-holder'>
          <div className='left-side'>
            {/* <h1 id="point" className="hidden">{bodovi}</h1> */}
            <h2 id='opened' className='hidden'>Otvorili ste poklon danas. Novi vas ceka sutra!</h2>
            <h2 id='points' className='hidden'>Cestitamo, dobili ste {bodovi} bodova!</h2>
            {/* {dozvoljenPoklon === false &&
              <h2>
                Otvorili ste poklon danas. Novi vas ceka sutra!
              </h2>
            } */}
            {
              (() => {
                if(otvorenPoklon === true ) {
                  // console.log("DOZVOLJENO?: ", dozvoljenPoklon);
                  return (
                    <div className='imageHolder'>
                      <img src={zatvorenPoklon} id='box' alt='zatvorenPoklon' onClick={dozvoljenPoklon ? () => imageClick(dozvoljenPoklon).then(() => {
                        let box = document.getElementById("box");
                        box.setAttribute('src', animiraniPoklon);
                        
                        // sleep(2000).then(()=>{
                        //   console.log('you can see me after 2000 milliseconds');
                        // })
                        // console.log("DOZVOLJENO?: ", dozvoljenPoklon);
                        // dozvoljenPoklon = false;
                        setBodovi(dobijeniBodovi);
                        delayedMessage(box);
                        // setDozvoljenPoklon(false);
                        // this.src = {animiraniPoklon}
                      }) : null } style={{"pointerEvents": "all"}} ></img>
                      <h1 id="point" className="hidden">{bodovi}</h1>
                    </div>
                  )
                  
                } else {
                    return (
                      <div>
                        <h2>Vec ste otvorili poklon danas. Novi vas ceka sutra!</h2>
                        <img src={slikaOtvorenogPoklona} className='already-opened-gift' alt='otvorenPoklon'></img>
                      </div>
                    )
                  }
              }
              )()  
            }  
          
            {/* {dozvoljenPoklon == true && 
              <img src={zatvorenPoklon} id='box' alt='zatvorenPoklon' onClick={() => imageClick().then(() => {
                let box = document.getElementById("box");
                box.setAttribute('src', animiraniPoklon);
                setBodovi(dobijeniBodovi);
                // sleep(2000).then(()=>{
                //   console.log('you can see me after 2000 milliseconds');
                // })
                delayedMessage(box);
                // this.src = {animiraniPoklon}
              }) } style={{"pointerEvents": "all"}} ></img>
            } */}
          </div>
          <div className='right-side'>
            <div className='last-opened-holder'>
              <h2 className='center'>Poslednji Otvoreni Pokloni</h2>
                {poslednjiOtvoreni.map((data) => {
                  return (
                    <div className='last-opened'>
                      <p className='last-opened-element' key={data.id}>{data.korisnik.ime}</p>
                      <p className='last-opened-element' key={data.id}>{data.bod.brojBodova}</p>
                    </div>
                  )
                })}
            </div>
            <div className='winners-holder'>
              <h2 className='center'>Proslomesecni Pobednici</h2>
              <div className='podium-image-holder'>
                <img src={postolje} alt='postolje'></img>
              </div>
            </div>
          </div> 
        </div>
        <div className='tables'>
          <div className='scoreboard-holder'>
            <h3>Mesecni</h3>
            <table>
              <tr>
                <th>Ime</th>
                <th>Broj Bodova</th>
              </tr>
                {mesecniBodovi.map((data) => {
                  let ukupanBrojBodova = 0;
                  data.bodovi.forEach(element => {
                    ukupanBrojBodova += element.brojBodova;
                  });
                  return (
                    <>
                      <tr>
                        <td key={data.id}>{data.ime}</td>
                        <td className='score-td' key={data.id}>{ukupanBrojBodova}</td>
                      </tr>
                    </>
                    // <td key={data.ime}>{data.brojBodova}</td>
                  )
                })}
              </table>
          </div>
          <div className='scoreboard-holder'>
            <h3>Prosli mesec</h3>
            <table>
              <tr>
                <th>Ime</th>
                <th>Broj Bodova</th>
              </tr>
                {prosliMesecBodovi.map((data) => {
                  let ukupanBrojBodova = 0;
                  data.bodovi.forEach(element => {
                    ukupanBrojBodova += element.brojBodova;
                  });
                  return (
                    <>
                      <tr>
                        <td key={data.id}>{data.ime}</td>
                        <td className='score-td' key={data.id}>{ukupanBrojBodova}</td>
                      </tr>
                    </>
                    // <td key={data.ime}>{data.brojBodova}</td>
                  )
                })}
              </table>
          </div>
          <div className='scoreboard-holder'>
            <h3>Jucerasnji</h3>
            <table>
              <tr>
                <th>Ime</th>
                <th>Broj Bodova</th>
              </tr>
              {jucerasnjiBodovi.map((data) => {
                let ukupanBrojBodova = 0;
                data.bodovi.forEach(element => {
                  ukupanBrojBodova += element.brojBodova;
                });
                return (
                  <>
                    <tr>
                      <td key={data.id}>{data.ime}</td>
                      <td className='score-td' key={data.id}>{ukupanBrojBodova}</td>
                    </tr>
                  </>
                  // <li key={data.id}>{data.ime} {ukupanBrojBodova}</li>
                )
              })}
            </table>
          </div>
          <div className='scoreboard-holder'>
            <h3>Dnevni</h3>
            <table>
              <tr>
                <th>Ime</th>
                <th>Broj Bodova</th>
              </tr>
              {dnevniBodovi.map((data) => {
                let ukupanBrojBodova = 0;
                data.bodovi.forEach(element => {
                  ukupanBrojBodova += element.brojBodova;
                });
                return (
                  <>
                    <tr>
                      <td key={data.id}>{data.ime}</td>
                      <td className='score-td' key={data.id}>{ukupanBrojBodova}</td>
                    </tr>
                  </>
                  // <li key={data.id}>{data.ime} {ukupanBrojBodova}</li>
                )
              })}
            </table>
          </div>
        </div>
        <img src={animiraniPoklon} style={{display: 'none'}} alt='animiraniPreload'></img>
      </div>
    )

    // const mesecniBodovi;
    // const [data, setData] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    // axios.get("http://localhost:8080/box/bodovi/mesecni")
    //     .then((response) => { 
    //         console.log("POZVAN AXIOS")
    //         mesecniBodovi = response.data;
    //     })

    // console.log(mesecniBodovi);
    // mesecni();

    // const getData = async () => {
    //   try {
    //     const response = await fetch(
    //       `http://localhost:8080/box/bodovi/mesecni`
    //     );
    //     if (!response.ok) {
    //       throw new Error(
    //         `This is an HTTP error: The status is ${response.status}`
    //       );
    //     }
    //     let actualData = await response.json();
    //     setData(actualData);
    //     setError(null);
    //   } catch(err) {
    //     setError(err.message);
    //     setData(null);
    //   } finally {
    //     setLoading(false);
    //   }
    // }

    // useEffect(() => {
    //     console.log("POZVAN")
    //     const getMesecniBodovi = async () => {
    //         try {
    //             const response = await axios.get(SERVER_ENDPOINT + "/mesecni");
    //             setData(response.data);
    //             console.log(response.data);
             
    //         } catch (err) {
    //             setError(err.message);
    //             setData(null);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     getMesecniBodovi();
    // }, []);

    // useEffect(() => {
        
        
    //   }, [])

    //   getData();

    // console.log(data);
    // getAllBodovi()
    // return(
    //     <h2>Dashboard</h2>
    // );
}