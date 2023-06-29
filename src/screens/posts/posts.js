import PostList from "../../components/PostList/PostList";
import { useState, useEffect } from "react";
import * as postsAPI from "../../utilities/post-api"
import { useParams } from "react-router-dom";
import './post.scss'

export default function Posts({ user, setUser }) {
    const [query, setQuery] = useState("")
    const [posts, setPosts] = useState([])
    const { resource } = useParams()

    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const posts = await postsAPI.index(resource, query)
            setPosts(posts || [])
            setQuery("")

        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        async function loadPosts() {
            try {
                const posts = await postsAPI.index(resource, query)
                setPosts(posts || [])
            } catch(err) {
                console.error(err)
            }
        }

        loadPosts()
    }, [resource])

    return (
        <div className="posts-page">
            <div>
                <form onSubmit={handleSubmit} className="search-input">
                    <label>Search: </label>
                    <input onChange={handleChange} type="text" value={query}></input>
                    <input type="submit" value="enter"></input>
                </form>
            </div>

            <div>
                <h1>{resource}</h1>
                <PostList posts={posts} user={user} setUser={setUser}/>
            </div>
        </div>
    )
}
