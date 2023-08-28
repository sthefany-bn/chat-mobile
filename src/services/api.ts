import axios from "axios";

export const api = axios.create({
    baseURL: "https://adonis-bn.onrender.com",
    headers: {
        Accept: 'application/json'
    }
})
