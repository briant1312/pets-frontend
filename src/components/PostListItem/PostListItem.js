import { useState } from "react"
import { useNavigate } from "react-router-dom"
// import { TbArrowBigUpFilled, TbArrowBigDownFilled } from "react-icons/tb"
import { likePost } from "../../utilities/post-api"
import { dislikePost } from "../../utilities/post-api"
import "./PostListItem.scss"
import arrow from '../assets/arrow.svg'
import grooming from '../assets/grooming.jpg'
import { savePost } from "../../utilities/users-api"
import SaveIcon from "../SaveIcon/SaveIcon"


export default function PostListItem({ post, user, setUser }) {
    const [likeTotal, setLikeTotal] = useState(post.likes.length - post.dislikes.length)
    // const [userLiked, setUserLiked] = useState(post.likes.includes(user._id));
    // const [userDisliked, setUserDisliked] = useState(post.dislikes.includes(user._id));
    const navigate = useNavigate()
    const [userSaved, setUserSaved] = useState(user.savedResources.includes(post._id))

    const handleShowPost = () => {
        navigate(`/show/${post._id}`)
    }

    const handleLike = async (e) => {
        e.stopPropagation()
        try {
            const updatedPost = await likePost(post._id)
            setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length)
        } catch (err) {
            console.error(err)
        }
    }

    const handleDislike = async (e) => {
        e.stopPropagation()
        try {
            const updatedPost = await dislikePost(post._id)
            setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length)
        } catch (err) {
            console.error(err)
        }
    }

    const handleSavePost = async (e) => {
        e.stopPropagation()
        try {
            const updatedUser = await savePost(post._id)
            if(!updatedUser) return
            setUser(updatedUser)
            setUserSaved(updatedUser.savedResources.includes(post._id))
        } catch(err) {
            console.error(err)
        }
    }

    return (
        <div className="post-list-item">
            <div className="like-block-2">
                <img src={arrow} className="up-arrow" height="10px" onClick={handleLike} alt="like" />
                {likeTotal}
                <img src={arrow} onClick={handleDislike} height="10px" alt="dislike" />
            </div>

            <div onClick={handleShowPost}  className="content-container">
                <img src={grooming} alt="dog being groomed" />

                <div className="text-container">
                    <h2>{post.title}</h2>
                    <p>{post.animal}</p>

                    <p>comments: {post.comments.length}</p>
                    <span onClick={handleSavePost}><SaveIcon user={user} setUser={setUser} userSaved={userSaved} /></span>
                </div>
            </div>
        </div>
    )
}
