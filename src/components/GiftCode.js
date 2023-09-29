import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom"
import { trackPromise } from 'react-promise-tracker';

const AUTH_PATH = `https://api.kutija.net/box/auth`;
export default function GiftCode() {

  const [validated, setValidated] = useState();

  let token = localStorage.getItem("access_token");

  const navigate = useNavigate();

  useEffect(() => {
    const getValidated = async () => {
      let response = await axios(`${AUTH_PATH}/validate2?token=` + token, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        withCredentials: true
      })
      console.log("VALIDIRANO?: " + response.data);
      setValidated(response.data);
    }

    trackPromise(getValidated());
  })
    
const sendGiftCode = async(info) => {
    try {
      let response = await axios(`https://api.kutija.net/box/giftCode/activateCode`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        data: info
      });
      //   console.log(response.data);
      if ( response.data != null) {
        setGiftCodeData(response.data);
      } else {
        setGiftCodeData(false);
      }
    } catch(e) {
      console.log(e);
    }
  }

const receiveGiftCode = async() => {
  let token = localStorage.getItem("access_token");
  try {
    let response = await axios(`https://api.kutija.net/box/giftCode/getCode`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    if ( response.status != null) {
      setGeneratedCodeData(response.data);
    } 
    // else {
    //   setGeneratedCodeData("Bonus kod je vec generisan danas. Pokusajte sutra!");
    // }
  } catch (e) {
    setGeneratedCodeData("Povezivanje sa serverom nije uspelo");
  }
}

  const HandleSubmit = async e => {
    e.preventDefault();
    let info = {
      giftcode: e.target[0].value,
    };
    await sendGiftCode(info);
  }

    const [giftCodeData, setGiftCodeData] = useState();
    const [generatedCodeData, setGeneratedCodeData] = useState();

    // let response = ''; 
    // let textColor = '';
    // if (generatedCodeData.isValid === true && generatedCodeData.activatedDate === null) {
    //   response = "VALIDAN";
    //   textColor = "green";
    // } else if( generatedCodeData.activatedDate !== null && generatedCodeData.isValid === false) {
    //   response = "ISKORIŠĆEN";
    //   textColor = "red";
    // } else if ( generatedCodeData.isValid === false && generatedCodeData.activatedDate === null) {
    //   response = "ISTEKAO";
    //   textColor = "red";
    // }

    if ( localStorage.getItem("access_token") === null || validated !== true ) {
      console.log(localStorage.getItem('access_token') + " " + validated); 
      navigate("/logout", {replace: true});
    }

    return (
      <>
      <Navbar />
        <h2 className='gift-code-title'>Poklon Kodovi</h2>
        <hr className='gift-code-hr' />
        <p className='center'>Kodovi donose između -10 i 30 bodova. Osoba koja generiše kod dobija 30 ukoliko se generisani kod iskoristi!</p>
        <div className='giftcode-main-holder'>
          <div className='gift-code-activate-holder'>
              <h3>Ovde možete uneti dobijeni poklon kod</h3>
              <hr className='gift-code-hr' />
              <form onSubmit={HandleSubmit}>
                <input className='gift-code-input' type="text" required placeholder='Poklon Kod'></input>
                <button className='btn-grad-2' type='submit'>Aktiviraj poklon kod</button>
              </form>
              {giftCodeData != undefined &&
                <>
                {(() => {
                  let classes = "gift-code-response ";
                  let returnString = "";
                  if (giftCodeData) {
                    returnString = `Iskoristili ste vaš poklon kod i ${giftCodeData.numberOfPoints > 0 ? "dobili" : "izgubili"} ste ${giftCodeData.numberOfPoints} bodova!`;
                    classes += "success"
                  } else {
                    returnString = "Uneti kod nije validan ili je istekao!";
                    classes += "failure"
                  }
                  return <p className={classes}>{returnString}</p>
                })()}
                </>
              }
          </div>
          <div className='gift-code-generate'>
            <h3>Generisanje novog poklon koda</h3>
            <p>Ovde možete videti vaš poklon kod koji dajete osobi na slici</p>
            <button className='btn-grad-2' onClick={receiveGiftCode}>Prikaži Kod</button>
            {generatedCodeData != undefined &&
            <>
              <hr className='gift-code-hr' />
              {/* <img className='gift-code' src={generatedCodeData.receiver.slika}></img> */}
              <div style={{backgroundImage: `url(${generatedCodeData.receiver.slika})`}} className='medium-image-div'></div>
              <h3>Bonus Kod: </h3>
              <h2>{generatedCodeData.bonusCode}</h2>
              {(() => {
                let response = ''; 
                let textColor = '';
                if (generatedCodeData.isValid === true && generatedCodeData.activatedDate === null) {
                  response = "VALIDAN";
                  textColor = "green";
                } else if ( generatedCodeData.activatedDate !== null && generatedCodeData.isValid === false) {
                  response = "ISKORIŠĆEN";
                  textColor = "red";
                } else if ( generatedCodeData.isValid === false && generatedCodeData.activatedDate === null) {
                  response = "ISTEKAO";
                  textColor = "red";
                }
                return <h2 className={textColor}>Status: {response}</h2>
              })()}   
              
            </>
            }
          </div>
        </div> 
      </>
    )
};