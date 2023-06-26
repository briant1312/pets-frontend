import { useEffect, useState } from "react"
import { show } from "../../utilities/post-api"
import CommentList from "../CommentList/CommentList.js"
import { likePost } from "../../utilities/post-api"
import { dislikePost } from "../../utilities/post-api"
import { createComment } from "../../utilities/comment-api"
import arrow from "../assets/arrow.svg"
import grooming from "../assets/grooming.jpg"
import "./PostShowItem.scss"

export default function PostShowItem({ resourceId }) {
    const [post, setPost] = useState(null)
    const [likeTotal, setLikeTotal] = useState(0)
    const [commentText, setCommentText] = useState("")

    useEffect(() => {
        const getPost = async () => {
            try {
                const selectedPost = await show(resourceId)
                setPost(selectedPost)
                setLikeTotal(selectedPost.likes.length - selectedPost.dislikes.length)
            } catch(err) {
                console.error(err)
            }
        }
        getPost(resourceId)
    },[resourceId])

    const handleLike = async (e) => {
        e.stopPropagation()
        try {
            const updatedPost = await likePost(post._id)
            setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length)

        } catch(err) {
            console.error(err)
        }
    }

    const handleDislike = async (e) => {
        e.stopPropagation()
        try {
            const updatedPost = await dislikePost(post._id)
            setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length)

        } catch(err) {
            console.error(err)
        }
    }

    const handleCreateComment = async (e) => {
        e.preventDefault()
        try {
            const updatedPost = await createComment(post._id, { text: commentText})
            setPost(updatedPost)
            setCommentText("")

        } catch(err) {
            console.error(err)
        }
    }

    return (
        <div className="post-item">
            {post &&
                <>
                    <h1 className="post-title">{post.title}</h1>
                    <div className="like-component">
                    <div className="like-block">
                    <img src={arrow} className="up-arrow" height="5px" onClick={handleLike} alt="like"/>
                        {likeTotal}
                    <img src={arrow} onClick={handleDislike} height="5px" alt="dislike"/>
                    </div>
                    <div>
                    <img src={grooming} height="300vh" alt="groomed"/>
                    </div>
                    </div>
                    <p className="post-text">{post.text}</p>
                    <textarea className="comment-box" value={commentText} onChange={(e) => setCommentText(e.target.value)}/>
                    <div>
                    <button onClick={handleCreateComment}>Submit</button>
                    </div>
                    {/* <CommentList comments ={post.comments}/> */}
                </>
            }
        </div>
    )
} 
