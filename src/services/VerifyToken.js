import axios from "axios";
import React from "react";

async function verifySession() {
    const AUTH_PATH = `https://bigalslist.com:8080/box/auth`;
    const config = {headers: {"Access-Control-Allow-Credentials": "true", "Access-Control-Allow-Origin": "*"} }
    let response = await axios(`${AUTH_PATH}/validate`, {
      method: "GET",
      config: config,
      withCredentials: true
    })
    // console.log("IZ APP.JS-a: " + response.data);
    return response.data;
}

export default verifySession;