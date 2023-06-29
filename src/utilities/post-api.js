import sendRequest from "./users-api";
const BASE_URL = process.env.REACT_APP_BASE_URL + "post"
// const BASE_URL = "http://localhost:3001/api/post"
// const BASE_URL = "https://pet-server-nqxj.onrender.com/api/post"


export async function index(category, query) {
    let queryString = ""
    if(category && query) queryString = `?category=${category}&q=${query}` 
    else if (category) queryString = `?category=${category}`
    else if (query) queryString = `?q=${query}`
    return sendRequest(BASE_URL + queryString)
}

export async function show(postId) {
    return sendRequest(`${BASE_URL}/${postId}`)
}

export async function create(postData) {
    return sendRequest(BASE_URL, 'POST', postData)
}

export async function deletePost(postId) {
    return sendRequest(`${BASE_URL}/${postId}`, 'DELETE')
}

export async function update(postId, postData) {
    return sendRequest(`${BASE_URL}/${postId}`, 'PATCH', postData)
}

export async function likePost(postId) {
    return sendRequest(`${BASE_URL}/likes/${postId}`, 'PATCH')
}

export async function dislikePost(postId) {
    return sendRequest(`${BASE_URL}/dislikes/${postId}`, 'PATCH')
}
