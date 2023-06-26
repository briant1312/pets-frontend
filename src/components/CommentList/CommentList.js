import CommentListItem from "../CommentListItem/CommentListItem.js"
import "./CommentList.scss"

export default function CommentList({ comments, user, setComments, setUser }) {
    return (
        <div className="comments-container">
            {comments.length > 0 && comments.map((comment) => (<CommentListItem comments={comments} setUser={setUser} setComments={setComments} user={user} key={comment._id} comment={comment} />))}
        </div>
    )
}

