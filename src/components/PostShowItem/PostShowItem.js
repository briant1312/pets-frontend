import { useEffect, useState } from "react"
import { show } from "../../utilities/post-api"

export default function PostShowItem({ resourceId }) {
    const [post, setPost] = useState(null)

    useEffect(() => {
        const getPost = async () => {
            const selectedPost = await show(resourceId)
            setPost(selectedPost)
        }
        getPost(resourceId)
    })

    return (
        <div>
            {post &&
                <>
                    <h1>{post.title}</h1>
                </>
            }
        </div>
    )
} 
