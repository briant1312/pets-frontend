import sendRequest from "./users-api";
// const BASE_URL = process.env.REACT_APP_BASE_URL + "comment"
// const BASE_URL = "http://localhost:3001/api/comment"
const BASE_URL = "https://pet-server-nqxj.onrender.com/api/comment"

export async function createComment(postId, comment) {
    return sendRequest(`${BASE_URL}/${postId}`, 'POST', comment)
}

export async function deleteComment(commentId) {
    return sendRequest(`${BASE_URL}/${commentId}`, 'DELETE')
}

//Adding Like and Dislike to Comments 

export async function likeComment(postId,commentId) {
    return sendRequest(`${BASE_URL}/likes/${postId}`,'PATCH', commentId)
}

//Body needs to include the comment.id

export async function dislikeComment(postId,commentId) {
    return sendRequest(`${BASE_URL}/dislikes/${postId}`,'PATCH', commentId)
}
