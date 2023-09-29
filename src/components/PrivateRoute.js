import { useNavigate } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";
import { trackPromise } from 'react-promise-tracker';

const AUTH_PATH = `https://api.kutija.net/box/auth`;

const config = {
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
    }
}

// const validate = async() => {
//     let token = localStorage.getItem("access_token");
//     try {
//       let response = await axios(`${AUTH_PATH}/validate2?token=` + token, {
//         method: "GET",
//         config: config
//       });
//     //   console.log(response.data);
//       return response.data;
//     } catch(e) {
//       console.log(e);
//     }
// }

export default function PrivateRoute({ children }) {
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        // const validate = async() => {
        //     let token = localStorage.getItem("access_token");
        //     try {
        //       let response = await axios(`${AUTH_PATH}/validate2?token=` + token, {
        //         method: "GET",
        //         config: config
        //       });
        //     //   console.log(response.data);
        //       return response.data;
        //     } catch(e) {
        //       console.log(e);
        //     }
        // }

        const getValidated = async() => {
            let token = localStorage.getItem("access_token");
            try {
              let response = await axios(`${AUTH_PATH}/validate2?token=` + token, {
                method: "POST",
                headers: {
                  "Authorization": `Bearer ${token}`
                }
              });
            //   console.log(response.data);
            setValidated(response.data);
            } catch(e) {
              console.log(e);
            }
        }
        trackPromise(getValidated());
    });
    // let validated = validate();
    const navigate = useNavigate();
    // console.log(validated)  
    if (validated) {
      console.log("VALIDIRANO JE")
      return children;
    } else {
      console.log("NIJE VALIDIRANO");
      return (
        navigate("/logout", {replace: true})
      );
    }
  }