import CommentListItem from "../CommentListItem/CommentListItem1.js"

export default function CommentList({comments}){
    return (
        <>
        {comments && comments.map((comment)=>(<CommentListItem key={comment._id} comment={comment}/>)) }
        <p>hello</p>
        </>
    )
}

// comment