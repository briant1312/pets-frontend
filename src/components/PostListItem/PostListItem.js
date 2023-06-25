import { useState } from "react"
import { useNavigate } from "react-router-dom"
// import { TbArrowBigUpFilled, TbArrowBigDownFilled } from "react-icons/tb"
import { likePost } from "../../utilities/post-api"
import { dislikePost } from "../../utilities/post-api"


export default function PostListItem({ post, user }) {
    const [likeTotal, setLikeTotal] = useState(post.likes.length - post.dislikes.length)
    // const [userLiked, setUserLiked] = useState(post.likes.includes(user._id));
    // const [userDisliked, setUserDisliked] = useState(post.dislikes.includes(user._id));
    const navigate = useNavigate()

    const handleShowPost = () => {
        navigate(`/show/${post._id}`)
    }

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
    
    return (
        <div onClick={handleShowPost}>
            <h2>{post.title}</h2>
            <p>{post.text}</p>
            <p>{post.animal}</p>
            <div>
                <button onClick={handleLike}>Like</button>
                {likeTotal}
                <button onClick={handleDislike}>Disike</button>
            </div>
            <p>comments: {post.comments.length}</p>
        </div>
    )
}
