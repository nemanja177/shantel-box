import React, { useEffect, useState } from 'react';
import axios from 'axios';
import bonusArrow from '../images/right-arrow.png'
import unknownUser from '../images/whiteQuestion.png'
import Navbar from './Navbar';
import Footer from './Footer';
import { trackPromise } from 'react-promise-tracker';
axios.defaults.withCredentials = true;

const BONUS_PATH = "https://kutija.net:8080/box/bonusBodovi"

const config = {headers: {"Authorization": `Bearer ${localStorage.getItem("access_token")}`, "Access-Control-Allow-Credentials": "true", "Access-Control-Allow-Origin": "*"}}
export default function Bonuses() {

    const[dailyBonuses, setDailyBonuses] = useState([]);
    const[yesterdayBonuses, setYesterdayBonuses] = useState([]);

    useEffect(() => {
        const getDnevniBonusi = async () => {
            let response = await axios(`${BONUS_PATH}/allDailyBonuses`, {
                method: "GET",
                config: config,
                withCredentials: true
            })
            setDailyBonuses(response.data);
        }

        const getJucerasnjiBodovi = async () => {
            let response = await axios(`${BONUS_PATH}/allYesterdayBonuses`, {
                method: "GET",
                config: config,
                withCredentials: true
            })
            setYesterdayBonuses(response.data);
        }
        getDnevniBonusi();
        getJucerasnjiBodovi();
        trackPromise(getDnevniBonusi());
    }, []);

    

    return (
        <div>
            <Navbar/> 
            <div className="all-bonuses-holder">
                <div className="daily-bonuses-holder">
                    <h3>Današnji bonus bodovi</h3>
                    {dailyBonuses.map((data) => {
                        console.log(data);
                        let receiverImage;
                        if (data.receiver === null ) { 
                            receiverImage = unknownUser;
                        } else {
                            receiverImage = data.receiver.slika;
                        }
                        return (
                            <div className='bonus-holder full-width' >
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
                <div className="daily-bonuses-holder">
                <h3>Jucerašnji bonus bodovi</h3>
                    {yesterdayBonuses.map((data) => {
                        console.log(data);
                        let receiverImage;
                        if (data.receiver === null ) { 
                            receiverImage = unknownUser;
                        } else {
                            receiverImage = data.receiver.slika;
                        }
                        return (
                            <div className='bonus-holder full-width' >
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
            </div>
            {/* <Footer /> */}
        </div>
    )
}