import axios from "axios"

export const api = axios.create({
    baseURL: 'https://projetointegrador1.onrender.com',
    timeout: 10000
})