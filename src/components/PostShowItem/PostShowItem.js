import { useEffect, useState } from "react"
import { show } from "../../utilities/post-api"
import CommentList from "../CommentList/CommentList.js"

export default function PostShowItem({ resourceId }) {
    const [post, setPost] = useState(null)

    useEffect(() => {
        const getPost = async () => {
            const selectedPost = await show(resourceId)
            setPost(selectedPost)
        }
        getPost(resourceId)
    },[resourceId])

    return (
        <div>
            {post &&
                <>
                    <h1>{post.title}</h1>
                    <CommentList comments ={post.comments}/>
                </>
            }
        </div>
    )
} 
