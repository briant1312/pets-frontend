import { getToken } from "./users-service"
// const BASE_URL = process.env.REACT_APP_BASE_URL + "users"
// const BASE_URL = "http://localhost:3001/api/users"
const BASE_URL = "https://pet-server-nqxj.onrender.com/api/users"

// process.env.REACT_APP_BASE_URL + "users"

export async function signUp(userData) {
    return sendRequest(BASE_URL, 'POST', userData)
}

export async function logIn(credentials) {
    return sendRequest(`${BASE_URL}/login`, 'POST', credentials)
}

export async function getSavedResources() {
    return sendRequest(`${BASE_URL}/saved-resources`)
}


export async function savePost(postId) {
    return sendRequest(`${BASE_URL}/save-post/${postId}`, 'PATCH')
}

export default async function sendRequest(url, method='GET', payload=null) {

    const options = { method }
    if(payload) {
        options.headers = { 'Content-Type': 'application/json'}
        options.body = JSON.stringify(payload)
    }
    const token = getToken()
    if(token) {
        options.headers = options.headers || {}
        options.headers.Authorization = `Bearer ${token}`
    }
    const res = await fetch(url, options)
    if(res.ok) {
        // this should be removed to just return res, and res.json should be called in whatever 
        // function is calling this. I just don't feel like changing all of the requests
        if(res.status === 204) {
            return res
        } else {
            return res.json()
        }
    } else {
        const error = await res.json()
        throw new Error(error)
    }
}

export async function checkToken() {
    try {
        return sendRequest(BASE_URL + '/check-token')
    } catch(err) {
        console.error(err)
    }
}
