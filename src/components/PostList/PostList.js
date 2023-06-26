import PostListItem from "../PostListItem/PostListItem"
import './PostList.scss'

export default function PostList({ user, posts, setUser }) {


    return (
        <div className="post-container">
            {posts && posts.map(post => (
                <PostListItem key={post._id} setUser={setUser} user={user} post={post} />
            ))}
        </div>
    )
}
