import axios from "axios"
const realTimeDatabase = axios.create({
    baseURL: 'https://vue-coach-app-3e75d-default-rtdb.firebaseio.com',
    timeout: 4000,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
    }
})

const authentication = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1',
    timeout: 4000,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
    }
})

export {realTimeDatabase, authentication}