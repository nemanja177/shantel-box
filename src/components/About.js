import React from "react";
import randomindici from '../images/shantel.jpeg'
import Navbar from "./Navbar";

export default function About() {
    return (
        <div>
            <Navbar/>
            <h2 className="center">Novosti</h2>
            <div className="news-holder">
                <h3>Verzija 1.51</h3>
                <ul>
                    <li>Sredjen izgled aplikacije za telefon. Velicina broja bodova kao i slicice ljudi za odabir bonus bodova su smanjene. 
                        Lista ljudi koji nisu otvorili kutiju se sad pravi u vise redova</li>
                    <li>Promenjen iznos dodanih bodova koji se dodeljuju sa 10 na 20</li>
                    <li>Sklonjen uskrsnji mod. Bodovi vraceni na stari opseg</li>
                </ul>
            </div>
            <div className="news-holder">
                <h3>Verzija 1.5</h3>
                <ul>
                    <li>Izmenjen dizajn aplikacije. Podeljena u segmente kojima se moze pristupiti preko gornje navigacije</li>
                    <li>Dodat uskrsnji mod! Promenjen logo, kutija se pretvorila u magicno jaje a rang liste su dobile novi okvir!</li>
                    <li>Tokom uskrsnjih praznika nije moguce dobiti ispod 100 bodova. Raspon dobijenih bodova smanjen, sad je minimum 100 a maksimum 200 bodova</li>
                </ul>
            </div>
            <div className="news-holder">
                <h3>Verzija 1.4</h3>
                <ul>
                    <li>Dodat pregled poslednjih 10 dodeljenih bonus bodova</li>
                    <li>Dodato dugme koje omogucava biranje izmedju dva pregleda: poslednje dobijeni bodovi i bonusi</li>
                </ul>
            </div>
            <div className="news-holder">
                <h3>Verzija 1.3.3</h3>
                <ul>
                    <li>Doradjen prikaz za korisnike koji su dobili specijalnu nagradu kako bi se lakse isticali na listi</li>
                    <li>Popravljena tabla za prikaz bodova.</li>
                </ul>
            </div>
            <div className="news-holder">
                <h3>Verzija 1.3.2</h3>
                <ul>
                    <li>Izmenjena tabela sa prikazom bonus bodova. Sada umesto na dnevnom pokazuje bonus bodove na mesecnom nivou</li>
                </ul>
            </div>
            <div className="news-holder">
                <h3>Verzija 1.3.1</h3>
                <ul>
                    <li>Zamenjen prikaz dobijenih bodova tokom danasnjeg i jucerasnjeg broja bodova. Umesto celokupnog broja bodova koristi se sledeci format: Broj bodova iz kutije + ukupan broj bonus bodova dobijenih taj dan</li>
                    <li>Dodat efekat prilikom odabira korisnika za dodatne bodove kao i automatsko refresovanje stranice nakon odabira korisnika</li>
                </ul>
            </div>
            <div className="news-holder">
                <h3>Verzija 1.3.0</h3>
                <ul>
                    <li>Dodat sistem bonus bodova - Nakon otvaranja kutije dobijace se bonus nagrada koju je moguce dodeliti drugome</li>
                    <li>Ukoliko se bonus ne dodeli, korisnik NECE moci da otvara kutiju sve dok to ne ucini</li>
                    <li>Dodat sistem za zakljucavanje kutije dok se radi na njoj kako bi sprecili nezeljene situacije ( sistem je u razradi tako da ocekujte vise detalja )</li>
                    <li>Proslomesecni bodovi su prebaceni na posebnu stranicu i nalazi se u navigaciji</li>
                    <li>Umesto proslomesecnih bodova stavljeni su ukupni bodovi dobijeni bonusima za svakog korisnika ( broj je vec dodat na ukupne bodove dobijene u toku dana, ne sabira se dodatno ) </li>
                </ul>
            </div>
            <div className="news-holder">
                <h3>Verzija 1.2.0</h3>
                <ul>
                    <li>Dodat novogodisnji mod</li>
                    <li>Dodat efekat padanja snega</li>
                    <li>Promenjen limit dobijanja bodova. Dok traju praznici moguce je dobiti od -100 do 200 poena</li>
                    <li>Dodati specijalni efekti za veliki plus i veliki minus kao i dodatne ikonice</li>
                </ul>
            </div>
            <div className="news-holder">
                <h3>Verzija 1.1.1</h3>
                <ul>
                    <li>Popravljen bug sa otvaranjem kutije. Moglo se otvoriti vise puta</li>
                    <li>Doradjen izgled za manje ekrane</li>
                </ul>
            </div>
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