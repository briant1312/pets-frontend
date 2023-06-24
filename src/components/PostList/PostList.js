import PostListItem from "../PostListItem/PostListItem"

export default function PostList({ user, posts }) {


    return (
        <div className="post-container">
            {posts && posts.map(post => (
                <PostListItem key={post._id} user={user} post={post} />
            ))}
        </div>
    )
}
