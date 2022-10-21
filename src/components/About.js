import React from "react";
import randomindici from '../images/shantel.jpeg'
import Navbar from "./Navbar";

export default function About() {
    return (
        <div>
            <Navbar/>
            <h2 className="center">Meet our Team</h2>
            <div className="image-center">
                <img src={randomindici} alt="team"></img>
            </div>
        </div>
    )
}