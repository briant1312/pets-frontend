import { useEffect, useState } from "react";
import { show } from "../../utilities/post-api";
import CommentList from "../CommentList/CommentList.js";
import { likePost } from "../../utilities/post-api";
import { dislikePost } from "../../utilities/post-api";
import { createComment } from "../../utilities/comment-api";
import arrow from "../assets/arrow.svg";
import redArrow from '../assets/red-arrow.svg'
import message from "../assets/Message.svg";
import grooming from "../assets/grooming.jpg";
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
        setPost(selectedPost);
        setLikeTotal(selectedPost.likes.length - selectedPost.dislikes.length);
        setComments(selectedPost.comments)
      } catch (err) {
        console.error(err);
      }
    };
    getPost(resourceId);
  }, [resourceId]);

  useEffect(() => {
    if (user) {
      setUserSaved(user.savedResources.includes(resourceId))
    }
  }, [user])

  const handleLike = async (e) => {
    e.stopPropagation();
    try {
      const updatedPost = await likePost(post._id);
      setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length);
      setIsDisliked(false)
      setisLiked(!isLiked)
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislike = async (e) => {
    e.stopPropagation();
    try {
      const updatedPost = await dislikePost(post._id);
      setLikeTotal(updatedPost.likes.length - updatedPost.dislikes.length);
      setisLiked(false)
      setIsDisliked(!isDisliked)
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateComment = async (e) => {
    e.preventDefault();
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
              {isLiked ? <img src={redArrow} className="up-arrow" height="10px" onClick={handleLike} alt="like" /> :
                <img src={arrow} className="up-arrow" height="10px" onClick={handleLike} alt="like" />}


              {likeTotal}

              {isDisliked ? <img src={redArrow} onClick={handleDislike} height="10px" alt="dislike" /> : <img src={arrow} onClick={handleDislike} height="10px" alt="dislike" />}

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
              <span onClick={handleSavePost}><SaveIcon post={post} userSaved={userSaved} /></span>
            </div>
            <div className="comment-section">
              <textarea
                className="comment-box"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button className="comment-button" onClick={handleCreateComment}>
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
