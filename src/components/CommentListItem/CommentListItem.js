export default function CommentListItem({comment}){
    return (
        <div>
            <p>{comment.text}</p>
            <p>By: {comment.owner?.userName}</p>
        </div>
    )
}
