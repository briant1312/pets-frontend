import { useState } from "react"
import { useNavigate } from "react-router-dom"
// import { TbArrowBigUpFilled, TbArrowBigDownFilled } from "react-icons/tb"
import { useParams } from "react-router-dom"

export default function PostListItem({ post, user }) {
    // const [likeTotal, setLikeTotal] = useState(post.likes.length - post.dislikes.length)
    // const [userLiked, setUserLiked] = useState(post.likes.includes(user._id));
    // const [userDisliked, setUserDisliked] = useState(post.dislikes.includes(user._id));
    const navigate = useNavigate()

    const handleShowPost = () => {
        navigate(`/show/${post._id}`)
    }

    return (
        <div onClick={handleShowPost}>
            <h2>{post.title}</h2>
            <p>{post.text}</p>
            <p>{post.animal}</p>
        </div>
    )
}
