import axios from "axios";
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { uploadImage } from "../services/ImageUploadService";

const SERVER_ENDPOINT = `https://kutija.net:8080/box/auth`;

const RegisterAPI = async (data) => {
    // const nav = useNavigate();
    // console.log(data);
    const REGISTER_ENDPOINT = `${SERVER_ENDPOINT}/signup`;
    const config = {headers: {"Access-Control-Allow-Credentials": "true", "Access-Control-Allow-Origin": "*"} }
    // console.log("DATA API: " + JSON.parse(data));
    try {

        let response = await axios.post(REGISTER_ENDPOINT, data);
        // console.log(response.status + " " + response.data.accessToken + " " + response.data.expiresIn + " " + response.data.id );
        if(response.status === 200){
            // console.log(accessToken + " " + expire_at + " " + id );
            // const nav = useNavigate();
            // nav("/box", {replace: true});
            // Login();
            console.log(response.data);
            // window.location.reload();
        } else {
            // console.log("lavor");
            // document.getElementById('loginError').classList.remove('hidden');
        }
        
        console.log(response.data);

    } catch(e){
        console.log(e);
    }
}

const HandleSubmit = async e => {
   
    e.preventDefault();
    let info = {
        slika: e.target[0].value,
        username: e.target[1].value,
        ime: e.target[2].value,
        prezime: e.target[3].value,
        email: e.target[4].value,
        password: e.target[5].value,
    };
    await RegisterAPI(info);
}

export default function Registration() {
    // const nav = useNavigate();
    const [imagePath, setImagePath] = useState()

    async function onFileChangeHandler(e) {
        e.preventDefault();
        const imageData = new FormData();
        imageData.append('imageFile', e.target.files[0]);
        const response = await axios.post(`https://kutija.net:8080/box/upload/image`, imageData, {
            onUploadProgress:progressEvent => {
            console.log("Uploading : " + ((progressEvent.loaded / progressEvent.total) * 100).toString() + "%")
            }
        });
        console.log(response.data);
        // let imagePath = uploadImage(imageData);
        setImagePath(response.data);
        // console.log(uploadImage(imageData))
    }

    return (
        <div>
            <label>
                <p>Ubacite sliku</p>
                <input type="file" className="form-control" name="file" onChange={onFileChangeHandler}/>
            </label>
            <form onSubmit={HandleSubmit}>
                
                    <input type="hidden" value={imagePath} disabled name="pathSlike"/>
                <label>
                    <p>Korisnicko ime</p>
                    <input type="text" name="username" />
                </label>
                <label>
                    <p>Ime</p>
                    <input type="text" name="ime" />
                </label>
                <label>
                    <p>Prezime</p>
                    <input type="text" name="prezime" />
                </label>
                <label>
                    <p>Email</p>
                    <input type="email" name="email" />
                </label>
                <label>
                    <p>Sifra</p>
                    <input type="password" name="password"/>
                </label>
                <div className="login-button-div">
                    <button type="submit">Registracija</button>
                </div>
            </form>
        </div>
    )
}