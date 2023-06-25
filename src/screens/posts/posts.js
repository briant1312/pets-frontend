import PostList from "../../components/PostList/PostList";
import { useState, useEffect } from "react";
import * as postsAPI from "../../utilities/post-api"
import { useParams } from "react-router-dom";

export default function Posts({ user }) {
    const [query, setQuery] = useState("")
    const [posts, setPosts] = useState([])
    const { resource } = useParams()

    useEffect(() => {
        async function loadPosts(){
            const posts = await postsAPI.index(resource, query)
            setPosts(posts)
        }

        loadPosts()
    }, [resource])

    return (
        <div>
            <h1>{resource}</h1>
            <PostList posts={posts} user={user} />
        </div>
    )
}
