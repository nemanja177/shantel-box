import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';


export default function GiftCode() {

    
const sendGiftCode = async(info) => {
  let token = localStorage.getItem("access_token");
    try {
      let response = await axios(`https://kutija.net:8080/box/giftCode/activateCode`, {
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
    let response = await axios(`https://kutija.net:8080/box/giftCode/getCode`, {
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

    return (
      <>
      <Navbar />
        <h2 className='gift-code-title'>Poklon Kodovi</h2>
        <div className='giftcode-main-holder'>
          <div className='gift-code-activate-holder'>
              <h3>Ovde možete uneti dobijeni poklon kod</h3>
              <form onSubmit={HandleSubmit}>
                <input className='gift-code-input' type="text" required placeholder='Poklon Kod'></input>
                <button className='btn-grad-2' type='submit'>Aktiviraj poklon kod</button>
              </form>
              { console.log(giftCodeData) }
              {giftCodeData != undefined &&
                <>
                {(() => {
                  let returnString = "";
                  if (giftCodeData != null) {
                    returnString = `Iskoristili ste vaš poklon kod i ${giftCodeData.numberOfPoints > 0 ? "dobili" : "izgubili"} ste ${giftCodeData.numberOfPoints} bodova!`;
                  } else {
                    returnString = "Uneti kod nije validan ili je istekao!";
                  }
                  return <p className='gift-code-response'>{returnString}</p>
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
                } else if( generatedCodeData.activatedDate !== null && generatedCodeData.isValid === false) {
                  response = "ISKORIŠĆEN";
                  textColor = "red";
                } else if ( generatedCodeData.isValid === false && generatedCodeData.activatedDate === null) {
                  response = "ISTEKAO";
                  textColor = "red";
                }
                return <h4 className={textColor}>Status: {response}</h4>
              })()}   
            </>
            }
          </div>
        </div> 
      </>
    )
};