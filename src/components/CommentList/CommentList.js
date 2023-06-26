import CommentListItem from "../CommentListItem/CommentListItem.js"

export default function CommentList({comments, user, setComments, setUser}){
    return (
        <>
        {comments.length && comments.map((comment)=>(<CommentListItem comments={comments} setUser={setUser} setComments={setComments} user={user} key={comment._id} comment={comment}/>)) }
        </>
    )
}

