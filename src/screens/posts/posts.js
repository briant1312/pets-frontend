import PostList from "../../components/PostList/PostList";
import { useState, useEffect } from "react";
import * as postsAPI from "../../utilities/post-api"
import { useParams } from "react-router-dom";

export default function Posts({ user }) {
    const [query, setQuery] = useState("")
    const [posts, setPosts] = useState([])
    const { resource } = useParams()

    const onQueryChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const posts = await postsAPI.index(resource, query)
        setPosts(posts)
    }

    useEffect(() => {
        setPosts([])
    }, [resource])

    return (
        <div>
            <h1>{resource}</h1>
            <form onSubmit={handleSubmit}>
                <input value={query} onChange={onQueryChange}/>
                <button >Submit</button>
            </form>
            <PostList posts={posts} user={user} />
        </div>
    )
}
