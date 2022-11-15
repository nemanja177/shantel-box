import React from "react";
import randomindici from '../images/shantel.jpeg'
import Navbar from "./Navbar";

export default function About() {
    return (
        <div>
            <Navbar/>
            <h2 className="center">Novosti</h2>
            <div className="news-holder">
                <h3>Verzija 1.1.0</h3>
                <ul>
                    <li>Dodat broj trentnog mesta u tabele</li>
                    <li>Redizajnirana login strana</li>
                </ul>
            </div>
            <div className="news-holder">
                <h3>Verzija 1.0.0</h3>
                <ul>
                    <li>Dodate su slike za specijalne nagrade</li>
                    <li>Sredjeni problemi sa slikama</li>
                    <li>Sredjena navigacija na telefonima ( Povecan logo, centrirano na sredinu )</li>
                </ul>
            </div>
            <div className="news-holder">
                <h3>Verzija 0.9.0</h3>
                <ul>
                    <li>Dodate su specijalne nagrade. Moguce je dobiti 10 evra ili slobodan dan iz kutije.</li>
                    <li>Dodata specijalna lista za specijalne nagrade</li>
                    <li>Vatreni efekat povecan sa 80 na 85 bodova</li>
                    <li>Stavljene boje za prva tri mesta u tabelu sa bodovima</li>
                    <li>Vise nije moguce dobiti 0 bodova. Sad je minimalan broj bodova 1</li>
                </ul>
            </div>
            <div className="news-holder">
                <h3>Verzija 0.8.2</h3>
                <ul>
                    <li>Stavljen broj bodova za prva tri mesta na podiumu</li>
                    <li>"About us" strana preimenovana u Novosti. Na njoj ce biti objavljeni sve informacije u vezi same aplikacije</li>
                    <li>Popravljen problem "Vec ste otvorili kutiju" kada kutija nije bila otvarana uopste</li>
                    <li>Ubacen efekat "hladnog boda". Svi koji su dobili bodove ispod 15 videce ovaj efekat</li>
                    <li>Sredjena optimizacija za telefon</li>
                </ul>
            </div>
            <div className="news-holder">
                <h3>Verzija 0.8.1</h3>
                <ul>
                    <li>Pomeren podium ispod kutije. Na njemu stoje slike pobednika za prosli mesec</li>
                    <li>Ubacen efekat "vatrenog boda". Svi koji su dobili bodove preko 80 videce ovaj efekat</li>
                    <li>Sredjena optimizacija za telefon</li>
                </ul>
            </div>
            <div className="news-holder">
                <h3>Verzija 0.7.1</h3>
                <ul>
                    <li>Male popravke u vezi slika u tabeli</li>
                    <li>Dodata lista poslednjih 5 korisnika koji su otvarali kutiju</li>
                </ul>
            </div>
            <div className="news-holder">
                <h3>Verzija 0.7.0</h3>
                <ul>
                    <li>Dodate slike za svakog korisnika</li>
                </ul>
            </div>
            {/* <h2 className="center">Meet our Team</h2>
            <div className="image-center">
                <img src={randomindici} alt="team"></img>
            </div> */}
        </div>
    )
}