import axios from "axios";

const IMAGE_API_PATH = 'https://kutija.net:8080/box/upload'

export const uploadImage = (imageData) => async () => {
    const response = await axios.post(`${IMAGE_API_PATH}/image`, imageData, {
        onUploadProgress:progressEvent => {
        console.log("Uploading : " + ((progressEvent.loaded / progressEvent.total) * 100).toString() + "%")
        }
    });
    // console.log("IMAGE DATA:" + imageData);
    console.log("RESPONSE: " + response.data);
    return response.data;
};