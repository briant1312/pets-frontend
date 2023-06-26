import { deleteComment } from "../../utilities/comment-api"
import './CommentListItem.scss'

export default function CommentListItem({ comment, user, setComments, comments }) {

    const handleDeleteComment = async () => {
        try {
            await deleteComment(comment._id)
            const updatedComments = comments.filter((cmt) => cmt._id !== comment._id)
            setComments(updatedComments)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="comment-container">
            <div className="owner-info">
                <img src={comment.owner.imageUrl} height="40px" alt="" />

                <div>
                    <p>@{comment.owner?.userName}</p>
                    <p>omega</p>
                </div>
            </div>

            <p className="comment-text">{comment.text}</p>

            {user && user._id === comment.owner._id && <button className="comment-delete-button" onClick={handleDeleteComment}>delete</button>}
        </div>
    )
}
