import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar";
import Footer from "./Footer";
import postolje from '../images/rsz_postolje.png'

const SERVER_PATH = "https://kutija.net:8080/box/bodovi";
const config = {headers: {"Authorization": `Bearer ${localStorage.getItem("access_token")}`, "Access-Control-Allow-Credentials": "true", "Access-Control-Allow-Origin": "*"}}

export default function LastMonthComponent() {
    const [prosliMesecBodovi, setProsliMesecBodovi] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        const getProsliMesecBodovi = async () => {
            const response = await fetch(`${SERVER_PATH}/prosliMesec`);
            setProsliMesecBodovi(await response.json());
        }
        getProsliMesecBodovi();
    }, [])

    return (
        <div>
            <Navbar />
            <div className='last-month-content-holder'>
                <div className='left-side-last-month'>
                    <div className='winners-holder'>
                        <h2 className='center'>Prošlomesečni Pobednici</h2>
                        <div className='podium-image-holder'>
                            <img className='podium' src={postolje} alt='postolje'></img>
                            {prosliMesecBodovi.slice(0, 3).map((data) => {
                            let ukupanBrojBodova = 0;
                            data.bodovi.forEach(element => {
                                ukupanBrojBodova += element.brojBodova;
                            });
                            return (
                                <div className='total-winner-holder'>
                                <div className='winner-img-holder'>
                                    <img className='winner-img' src={data.slika}></img>
                                </div>
                                <h2 className='winner-total-points center'>{ukupanBrojBodova}</h2>
                                </div> 
                            )
                            })}
                        </div>
                    </div>
                </div>
                <div className='right-side-last-month'>
                    <div className='tables'>
                        <div className='scoreboard-holder'>
                            <h2 className='last-month-title'>Prošlomesečna Lista</h2>
                            <table>
                                <tr>
                                    <th></th>
                                    <th>Slika</th>
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
                                                <td></td>
                                                <td className='flex-image-center'>
                                                    {/* <img src={data.slika} className='small-image' alt='slika'></img> */}
                                                    <div style={{ backgroundImage: `url(${data.slika})` }} className='small-image-div'></div>
                                                </td>
                                                {/* <td className='flex-image-center'><img src={data.slika} className='small-image' alt='slika'></img></td> */}
                                                <td key={data.id}>{data.ime}</td>
                                                <td className='score-td' key={data.id}>{ukupanBrojBodova}</td>
                                            </tr>
                                        </>
                                        // <td key={data.ime}>{data.brojBodova}</td>
                                    );
                                })}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}