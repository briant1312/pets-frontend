import { useEffect, useState } from "react";
import { show } from "../../utilities/post-api";
import CommentList from "../CommentList/CommentList.js";
import { likePost } from "../../utilities/post-api";
import { dislikePost } from "../../utilities/post-api";
import { createComment } from "../../utilities/comment-api";
import arrow from "../assets/arrow.svg";
import redArrow from '../assets/red-arrow.svg'
import greenArrow from '../assets/green-arrow.png'
import message from "../assets/Message.svg";
import SaveIcon from "../SaveIcon/SaveIcon";
import "./PostShowItem.scss";
import { savePost } from "../../utilities/users-api";

export default function PostShowItem({ resourceId, user, setUser }) {
  const [post, setPost] = useState(null);
  const [likeTotal, setLikeTotal] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [userSaved, setUserSaved] = useState(false)
  const [comments, setComments] = useState([])
  const [isLiked, setisLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)

  useEffect(() => {
    const getPost = async () => {
      try {
        const selectedPost = await show(resourceId);
        if(selectedPost) {
          setIsDisliked(selectedPost.dislikes.includes(user?._id))
          setisLiked(selectedPost.likes.includes(user?._id))
          setPost(selectedPost);
          setComments(selectedPost.comments)
          setLikeTotal(selectedPost.likes.length - selectedPost.dislikes.length);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getPost(resourceId);
  }, [resourceId]);

  useEffect(() => {
    if (user) {
      setUserSaved(user.savedResources.includes(resourceId))
    } else {
      setIsDisliked(false)
      setisLiked(false)
      setUserSaved(false)
    }
  }, [user])

  const handleLike = async (e) => {
    e.stopPropagation();
    if(!user) return
    try {
      const updatedPost = await likePost(post._id);
      if(!updatedPost) return
      setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length);
      setIsDisliked(updatedPost.dislikes.includes(user._id))
      setisLiked(updatedPost.likes.includes(user._id))
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislike = async (e) => {
    e.stopPropagation();
    if(!user) return
    try {
      const updatedPost = await dislikePost(post._id);
      if(!updatedPost) return
      setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length);
      setIsDisliked(updatedPost.dislikes.includes(user._id))
      setisLiked(updatedPost.likes.includes(user._id))
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateComment = async (e) => {
    e.preventDefault();
    if(!user) return
    try {
      const updatedPost = await createComment(post._id, { text: commentText });
      if (updatedPost) {
        setPost(updatedPost);
        setComments(updatedPost.comments)
      }
      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSavePost = async (e) => {
    e.stopPropagation()
    if(!user) return
    try {
      const updatedUser = await savePost(post._id)
      if (!updatedUser) return
      setUser(updatedUser)
      setUserSaved(updatedUser.savedResources.includes(resourceId))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="post-item">
      {post && (
        <>
          <h1 className="post-title">{post.title}</h1>
          <div className="like-component">
            <div className="like-block">
              {isLiked ? <img src={greenArrow} className="up-arrow" height="10px" onClick={handleLike} alt="like" /> :
                <img src={arrow} className={ user ? "up-arrow" : "up-arrow disabled"} height="10px" onClick={handleLike} alt="like" />}
              {user &&<div className="like-tool-tip">{isLiked ? "unlike" : "like"}</div>}


              {likeTotal}

              {isDisliked ? <img src={redArrow} className="down-arrow" onClick={handleDislike} height="10px" alt="dislike" /> :
                <img src={arrow} onClick={handleDislike} className={ user ? "down-arrow" : "down-arrow disabled"} height="10px" alt="dislike" />}
                {user && <div className="dislike-tool-tip">dislike</div>}

            </div>
            <div>
              <img src={post.imageUrl} height="300vh" alt="groomed" />
            </div>
          </div>

          <p className="post-text">{post.text}</p>
          <div className="icons-comment-input">
            <div className="icons">
              <img src={message} alt="comment" height="20px" />
              <p className="comment-count">{post.comments.length} comment</p>
              <span className={user ? "save-icon" : "save-icon disabled"} onClick={handleSavePost}><SaveIcon post={post} userSaved={userSaved} /></span>
            </div>
            <div className="comment-section">
              <textarea
                className="comment-box"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button className={user ? "comment-button" : "comment-button disabled"} onClick={handleCreateComment} >
                Post
              </button>
            </div>
          </div>

          <div className="post-comments">
            <CommentList setUser={setUser} comments={comments} setComments={setComments} user={user} />
          </div>
        </>
      )}
    </div>
  );
}
