import PostList from "../../components/PostList/PostList";
import { useState, useEffect } from "react";
import * as postsAPI from "../../utilities/post-api"

export default function Posts({ user }) {
    const [query, setQuery] = useState("")
    const [animal, setAnimal] = useState("")
    const [posts, setPosts] = useState([])

    const onQueryChange = (e) => {
        setQuery(e.target.value)
    }

    const onAnimalChange = (e) => {
        setAnimal(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const posts = await postsAPI.index(animal, query)
        setPosts(posts)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select  defaultValue="" onChange={onAnimalChange}>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="">All</option>
                </select>
                <input value={query} onChange={onQueryChange}/>
                <button >Submit</button>
            </form>
            <PostList posts={posts} user={user} />
        </div>
    )
}
