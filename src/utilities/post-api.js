import sendRequest from "./users-api";
// const BASE_URL = process.env.REACT_APP_BASE_URL + "post"
// const BASE_URL = "http://localhost:3001/api/post"
const BASE_URL = "https://pet-server-nqxj.onrender.com/api/post"


export async function index(category, query) {
    let queryString = ""
    if(category && query) queryString = `?category=${category}&q=${query}` 
    else if (category) queryString = `?category=${category}`
    else if (query) queryString = `?q=${query}`
    try {
        const posts = await sendRequest(BASE_URL + queryString)
        return posts
    } catch(err) {
        console.error(err)
    }
}

export async function show(postId) {
    try {
        const post = await sendRequest(`${BASE_URL}/${postId}`)
        return post
    } catch(err) {
        console.error(err)
    }
}

export async function create(postData) {
    try {
        const post = await sendRequest(BASE_URL, 'POST', postData)
        return post
    } catch(err) {
        console.error(err)
    }
}

export async function deletePost(postId) {
    try {
        await sendRequest(`${BASE_URL}/${postId}`, 'DELETE')
        return
    } catch(err) {
        console.error(err)
    }
}

export async function update(postId, postData) {
    try {
        const post = await sendRequest(`${BASE_URL}/${postId}`, 'PATCH', postData)
        return post
    } catch(err) {
        console.error(err)
    }
}

export async function likePost(postId) {
    try {
        const post = await sendRequest(`${BASE_URL}/likes/${postId}`, 'PATCH')
        return post
    } catch(err) {
        console.error(err)
    }
}

export async function dislikePost(postId) {
    try {
        const post = await sendRequest(`${BASE_URL}/dislikes/${postId}`, 'PATCH')
        return post
    } catch(err) {
        console.error(err)
    }
}
