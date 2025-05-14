import axios from "axios"

export const api = axios.create({
    baseURL: 'https://schedule-container.onrender.com/v1/',
    timeout: 10000
})
// export const api = axios.create({
//     baseURL: 'http://localhost:8000/v1/',
//     timeout: 10000
// })