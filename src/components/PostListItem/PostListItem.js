import { useState } from "react"
import { useNavigate } from "react-router-dom"
// import { TbArrowBigUpFilled, TbArrowBigDownFilled } from "react-icons/tb"

export default function PostListItem({ post, user }) {
    // const [likeTotal, setLikeTotal] = useState(post.likes.length - post.dislikes.length)
    // const [userLiked, setUserLiked] = useState(post.likes.includes(user._id));
    // const [userDisliked, setUserDisliked] = useState(post.dislikes.includes(user._id));

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.text}</p>
            <p>{post.animal}</p>
        </div>
    )
}
