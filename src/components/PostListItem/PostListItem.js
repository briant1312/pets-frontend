import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { likePost } from "../../utilities/post-api"
import { dislikePost } from "../../utilities/post-api"
import "./PostListItem.scss"
import arrow from '../assets/arrow.svg'
import greenArrow from '../assets/green-arrow.png'
import redArrow from '../assets/red-arrow.svg'
import grooming from '../assets/grooming.jpg'
import { savePost } from "../../utilities/users-api"
import SaveIcon from "../SaveIcon/SaveIcon"


export default function PostListItem({ post, user, setUser }) {
    const [likeTotal, setLikeTotal] = useState(post.likes.length - post.dislikes.length)
    const navigate = useNavigate()
    const [userSaved, setUserSaved] = useState(false)
    const [isLiked, setisLiked] = useState(false)
    const [isDisliked, setIsDisliked] = useState(false)
    

    const handleShowPost = () => {
        navigate(`/show/${post._id}`)
    }

    const handleLike = async (e) => {
        e.stopPropagation()
        if(!user) return
        try {
            const updatedPost = await likePost(post._id)
            if(!updatedPost) return
            setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length)
            setIsDisliked(updatedPost.dislikes.includes(user._id))
            setisLiked(updatedPost.likes.includes(user._id))
        } catch (err) {
            console.error(err)
        }
    }

    const handleDislike = async (e) => {
        e.stopPropagation()
        if(!user) return
        try {
            const updatedPost = await dislikePost(post._id)
            if(!updatedPost) return
            setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length)
            setIsDisliked(updatedPost.dislikes.includes(user._id))
            setisLiked(updatedPost.likes.includes(user._id))
        } catch (err) {
            console.error(err)
        }
    }

    const handleSavePost = async (e) => {
        e.stopPropagation()
        if(!user) return
        try {
            const updatedUser = await savePost(post._id)
            if (!updatedUser) return
            setUser(updatedUser)
            setUserSaved(updatedUser.savedResources.includes(post._id))
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if (user) {
            setUserSaved(user.savedResources.includes(post._id))
            setIsDisliked(post.dislikes.includes(user._id))
            setisLiked(post.likes.includes(user._id))
        } else {
            setIsDisliked(false)
            setisLiked(false)
            setUserSaved(false)
        }
    }, [user])

    return (
        <div className="post-list-item">
            <div className="like-block-2">
                {isLiked ? <img src={greenArrow} className="up-arrow" height="10px" onClick={handleLike} alt="like" /> :
                <img src={arrow} className={user ? "up-arrow" : "up-arrow disabled"} height="10px" onClick={handleLike} alt="like" />}
                {user &&<div className="like-tool-tip">{isLiked ? "unlike" : "like"}</div>}


                {likeTotal}

                {isDisliked ? <img src={redArrow} className="down-arrow" onClick={handleDislike} height="10px" alt="dislike" /> : <img src={arrow} className={user ? "down-arrow" : "disabled down-arrow"} onClick={handleDislike} height="10px" alt="dislike" />}
                {user && <div className="dislike-tool-tip">dislike</div>}
                
            </div>

            <div onClick={handleShowPost} className="content-container">
                <img className="post-img" src={post.imageUrl} alt="dog being groomed" />

                <div className="text-container">
                    <h2><b>{post.title}</b></h2>
                    <p>{post.animal}</p>

                    <p>comments: {post.comments.length}</p>
                    <span className={ user ? "save-icon" : "save-icon disabled"} onClick={handleSavePost}><SaveIcon user={user} setUser={setUser} userSaved={userSaved} /></span>
                </div>
            </div>
        </div>
    )
}
