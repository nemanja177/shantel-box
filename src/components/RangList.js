import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';

import zvezda from '../images/prva-zvezda.png';
import dvezvezde from '../images/druga-zvezda.png';
import trizvezde from '../images/treca-zvezda.png';
import cetrizvezde from '../images/cetvrta-zvezda.png';
import petzvezda from '../images/peta-zvezda.png';

import kartica from '../images/giftcode-icon.png';

import React, { useEffect, useState } from 'react';

const SERVER_PATH = "https://api.kutija.net/box/bodovi";
const BONUS_PATH = "https://api.kutija.net/box/bonusBodovi";

export default function RangList() {

    const [mesecniBodovi, setMesecniBodovi] = useState([]);
    const [jucerasnjiBodovi, setJucerasnjiBodovi] = useState([]);
    const [dnevniBodovi, setDnevniBodovi] = useState([]);
    const [dodatniBodovi, setDodatniBodovi] = useState([]);

    useEffect(() => {
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

      const getDodatniBodovi = async () => {
        const response = await fetch(`${BONUS_PATH}/allMontlyBonuses`);

        setDodatniBodovi(await response.json());
      }

      getMesecniBodovi()
      getJucerasnjiBodovi()
      getDnevniBodovi()
      getDodatniBodovi()
    },[]);

    return (
        <div>
            <Navbar />
            <div className='tables'>
                <div className='scoreboard-holder'>
                    <h3>Današnji</h3>
                    <table>
                        <tr>
                            <th></th>
                            <th>Slika</th>
                            <th>Ime</th>
                            <th>Broj Bodova</th>
                        </tr>
                        {dnevniBodovi.map((data) => {
                        let ukupanBrojBodova = 0;
                        let classNames = "";
                        // let bonusBodovi = 0;
                        let brojBonusBodova = 0;
                        let poklonKodBodovi = 0;
                        let ispis = '';
                        let ispisSlika = undefined;
                        let klasaSlike = 'bonus-points-star';
                        data.bodovi.every(element => {
                            if ( element.specijalnaNagrada === "Poeni" )
                                // bonusBodovi += element.brojBodova;
                                brojBonusBodova += 1;
                            else if ( element.specijalnaNagrada === "Gift" ){
                                poklonKodBodovi += element.brojBodova;
                            } else {
                                ukupanBrojBodova += element.brojBodova;
                            }
                            if ( element.specijalnaNagrada === "10 Evra") {
                                ispis = element.specijalnaNagrada;
                                classNames += "table-lucky";
                                return false;
                            }
                            else {
                                ispis = <span className='table-image-holder'>{ukupanBrojBodova} + {poklonKodBodovi} <img className='bonus-gift-card' src={kartica}></img></span>;
                                switch (brojBonusBodova) {
                                    case 1: {
                                        ispisSlika = zvezda;
                                        klasaSlike = "prva-zvezda";
                                        break;
                                    }
                                    case 2: {
                                        ispisSlika = dvezvezde;
                                        klasaSlike = "druga-zvezda";
                                        break;
                                    }
                                    case 3: {
                                        ispisSlika = trizvezde;
                                        klasaSlike = "treca-zvezda";
                                        break;
                                    }
                                    case 4: {
                                        ispisSlika = cetrizvezde;
                                        klasaSlike = "cetvrta-zvezda";
                                        break;
                                    }
                                    case 5: {
                                        ispisSlika = petzvezda;
                                        klasaSlike = "peta-zvezda";
                                        break;
                                    }
                                    default:
                                        break;
                                }
                                return true;
                            }
                        });
                        //let url = `https://kutija.net/images/` + data.slika;
                        return (
                            <>
                            <tr className={classNames}>
                                <td></td>
                                <td className='flex-image-center'>
                                {/* <img src={data.slika} className='small-image' alt='slika'></img> */}
                                <div style={{backgroundImage: `url(${data.slika})`}} className='small-image-div'></div>
                                </td>
                                <td key={data.id}>
                                    <div className='name-holder'>
                                        {data.ime}
                                        {ispisSlika != undefined &&
                                            <>
                                                <img src={ispisSlika} className={klasaSlike}></img>
                                            </>
                                        }
                                    </div>
                                </td>
                                <td className='score-td' key={data.id}>{ispis}</td>
                            </tr>
                            </>
                            // <li key={data.id}>{data.ime} {ukupanBrojBodova}</li>
                        )
                        })}
                    </table>
                    </div>
                <div className='scoreboard-holder'>
                    <h3>Jučerašnji</h3>
                    <table>
                    <tr>
                        <th></th>
                        <th>Slika</th>
                        <th>Ime</th>
                        <th>Broj Bodova</th>
                    </tr>
                    {jucerasnjiBodovi.map((data) => {
                        let ukupanBrojBodova = 0;
                        let classNames = "";
                        // let bonusBodovi = 0;
                        let brojBonusBodova = 0;
                        let poklonKodBodovi = 0;
                        let ispis = '';
                        let ispisSlika = undefined;
                        let klasaSlike = 'bonus-points-star';
                        data.bodovi.every(element => {
                            if ( element.specijalnaNagrada === "Poeni" )
                                // bonusBodovi += element.brojBodova;
                                brojBonusBodova += 1;
                            else if ( element.specijalnaNagrada === "Gift" ){
                                    poklonKodBodovi += element.brojBodova;
                                } else {
                                    ukupanBrojBodova += element.brojBodova;
                                }
                            if ( element.specijalnaNagrada === "10 Evra" ) {
                                ispis = element.specijalnaNagrada;
                                classNames += "table-lucky";
                                return false;
                            }
                            else {
                                ispis = <span className='table-image-holder'>{ukupanBrojBodova} + {poklonKodBodovi} <img className='bonus-gift-card' src={kartica}></img></span>;
                                switch (brojBonusBodova) {
                                    case 1: {
                                        ispisSlika = zvezda;
                                        klasaSlike = "prva-zvezda";
                                        break;
                                    }
                                    case 2: {
                                        ispisSlika = dvezvezde;
                                        klasaSlike = "druga-zvezda";
                                        break;
                                    }
                                    case 3: {
                                        ispisSlika = trizvezde;
                                        klasaSlike = "treca-zvezda";
                                        break;
                                    }
                                    case 4: {
                                        ispisSlika = cetrizvezde;
                                        klasaSlike = "cetvrta-zvezda";
                                        break;
                                    }
                                    case 5: {
                                        ispisSlika = petzvezda;
                                        klasaSlike = "peta-zvezda";
                                        break;
                                    }
                                    default:
                                        break;
                                }
                                return true;
                            }
                        });
                        return (
                        <>
                            <tr className={classNames}>
                            <td></td>
                            <td className='flex-image-center'>
                                {/* <img src={data.slika} className='small-image' alt='slika'></img> */}
                                <div style={{backgroundImage: `url(${data.slika})`}} className='small-image-div'></div>
                            </td>
                            <td key={data.id}>
                                <div className='name-holder'>
                                    {data.ime}
                                    {ispisSlika != undefined &&
                                        <>
                                            <img src={ispisSlika} className={klasaSlike}></img>
                                        </>
                                    }
                                </div>
                            </td>
                            <td className='score-td' key={data.id}>{ispis}</td>
                            </tr>
                        </>
                        // <li key={data.id}>{data.ime} {ukupanBrojBodova}</li>
                        )
                    })}
                    </table>
                </div>
                <div className='scoreboard-holder'>
                    <h3>Mesečni</h3>
                    <table>
                    <tr>
                        <th></th>
                        <th>Slika</th>
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
                                <td></td>
                                {/* <td className='flex-image-center'><img src={data.slika} className='small-image' alt='slika'></img></td> */}
                                <td className='flex-image-center'>
                                {/* <img src={data.slika} className='small-image' alt='slika'></img> */}
                                <div style={{backgroundImage: `url(${data.slika})`}} className='small-image-div'></div>
                                </td>
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
                    <h3>Ukupni Bonus Bodovi u Mesecu</h3>
                    <table>
                    <tr>
                        <th></th>
                        <th>Slika</th>
                        <th>Ime</th>
                        <th>Broj Bodova</th>
                    </tr>
                        {dodatniBodovi.map((data) => {
                        let ukupanBrojBodova = 0;
                        data.bodovi.forEach(element => {
                            ukupanBrojBodova += element.brojBodova;
                        });
                        return (
                            <>
                            <tr>
                                <td></td>
                                <td className='flex-image-center'>
                                <div style={{backgroundImage: `url(${data.slika})`}} className='small-image-div'></div>
                                </td>
                                <td key={data.id}>{data.ime}</td>
                                <td className='score-td' key={data.id}>+{ukupanBrojBodova}</td>
                            </tr>
                            </>
                        )
                        })}
                    </table>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}