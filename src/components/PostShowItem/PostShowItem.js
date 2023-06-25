import { useEffect, useState } from "react"
import { show } from "../../utilities/post-api"
import CommentList from "../CommentList/CommentList.js"
import { likePost } from "../../utilities/post-api"
import { dislikePost } from "../../utilities/post-api"
import { createComment } from "../../utilities/comment-api"

export default function PostShowItem({ resourceId }) {
    const [post, setPost] = useState(null)
    const [likeTotal, setLikeTotal] = useState(0)
    const [commentText, setCommentText] = useState("")

    useEffect(() => {
        const getPost = async () => {
            const selectedPost = await show(resourceId)
            setPost(selectedPost)
            setLikeTotal(selectedPost.likes.length - selectedPost.dislikes.length)
        }
        getPost(resourceId)
    },[resourceId])

    const handleLike = async (e) => {
        e.stopPropagation()
        const updatedPost = await likePost(post._id)
        setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length)
    }

    const handleDislike = async (e) => {
        e.stopPropagation()
        const updatedPost = await dislikePost(post._id)
        setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length)
    }

    const handleCreateComment = async (e) => {
        e.preventDefault()
        const updatedPost = await createComment(post._id, { text: commentText})
        setPost(updatedPost)
        setCommentText("")
    }

    return (
        <div>
            {post &&
                <>
                    <h1>{post.title}</h1>
                    <div>
                        <button onClick={handleLike}>Like</button>
                        {likeTotal}
                        <button onClick={handleDislike}>Disike</button>
                    </div>
                    <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)}/>
                    <button onClick={handleCreateComment}>Submit</button>
                    <CommentList comments ={post.comments}/>
                </>
            }
        </div>
    )
} 
