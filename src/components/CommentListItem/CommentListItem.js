import { deleteComment } from "../../utilities/comment-api"

export default function CommentListItem({comment, user, setComments, comments}){

    const handleDeleteComment = async () => {
        try {
            await deleteComment(comment._id)
            const updatedComments = comments.filter((cmt) => cmt._id !== comment._id)
            setComments(updatedComments)
        } catch(err) {
            console.error(err)
        }
    }

return (
    <div>
        <p>{comment.text}</p>
        <p>By: {comment.owner?.userName}</p>
        {user._id === comment.owner._id && <button onClick={handleDeleteComment}>delete</button>}
    </div>
)
}
